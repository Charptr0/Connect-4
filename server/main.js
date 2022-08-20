const app = require("express")();
const server = require("http").Server(app);
const cors = require("cors");
const { 
    removePlayerFromRoom,
    addPlayerToRoom,
    getAllUsersFromRoom, 
    roomExists,
    activeRooms
} = require("./activeRooms");
const {
    addPlayerToDictionary,
    getRoomFromDictionary,
    removePlayerFromDictionary
}  = require("./playerDictionary");
require("dotenv").config();
const io = require("socket.io")(server, {
    cors : {
        origin : [process.env.FRONTEND_HOST]
    },
});

app.use(cors({
    origin : [process.env.FRONTEND_HOST]
}));

const port = process.env.PORT || 4000;

/**
 * Gets the total amount of players in a certain room
 * @param {*} roomId - The room id 
 * @returns the total player count in the room
 */
function getCurrentRoomSize(roomId) {
    const room = io.sockets.adapter.rooms.get(roomId);
    return room ? room.size : 0;
}

io.on("connection", socket => {
    // listener when a user joins the room
    socket.on("joinRoom", (roomId, username) => {
        // join the room
        socket.join(roomId);
        
        // add the user to memory
        addPlayerToRoom(socket.id, username, roomId);
        addPlayerToDictionary(socket.id, roomId);

        // send to frontend
        socket.to(roomId).emit("joinedRoom", username);
    });

    socket.on("playerLeft", roomId => {
        socket.to(roomId).emit("playerHasLeft");
    });

    // listener when a user leaves the room
    socket.on('disconnect', () => {
        const currentRoom = getRoomFromDictionary(socket.id);

        socket.to(currentRoom).emit('playerLeft');
        socket.leave(currentRoom);

        removePlayerFromRoom(currentRoom, socket.id);
        removePlayerFromDictionary(socket.id);

        socket.disconnect();
    });
    
    // listener when a user make a move
    socket.on("playerMoved", (board, isPlayer1Turn, roomId) => {
        socket.to(roomId).emit("updateBoard", board, !isPlayer1Turn);
    });

    socket.on("resetGame", (roomId) => {
        socket.to(roomId).emit("gameReset");
    });

    socket.on("sendMessage", (roomId, username, message) => {
        socket.to(roomId).emit("receiveMessage", message, username);
    });
});

app.get("/get-room-size/:roomId", (req, res) => {
    const roomId = req.params.roomId;

    if(!roomId) {
        return res.status(400).send();
    }

    return res.json({
        size : getCurrentRoomSize(roomId)
    });
})

app.get("/status", (req, res) => {
    res.send();
});

app.get("/room-exist/:roomId", (req, res) => {
    const roomId = req.params.roomId;

    if(!roomExists(roomId)) {
        res.status(404).send();
    } else {
        res.send();
    }

})

app.get("/get-opponent/:roomId/:userId", (req, res) => {
    const roomId = req.params.roomId;
    const userId = req.params.userId;

    if(!roomExists(roomId) || !userId) {
        return res.status(404).send();
    }

    else {
        const users = getAllUsersFromRoom(roomId);

        const opponent = users.find(user => user.id !== userId);
        return opponent ? res.json(opponent) : res.status(404).send();
    }
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});