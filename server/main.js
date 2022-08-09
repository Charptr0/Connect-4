const app = require("express")();
const server = require("http").Server(app);
const cors = require("cors")
require("dotenv").config();
const io = require("socket.io")(server, {
    cors : {
        origin : [process.env.FRONTEND_HOST]
    },
});

app.use(cors({
    origin : [process.env.FRONTEND_HOST]
}))

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
    socket.on("joinRoom", (roomId, username) => {
        console.log(`Joining room ${roomId}`);

        socket.join(roomId);
        socket.to(roomId).emit("joinedRoom", username);
    });

    socket.on("playerLeft", roomId => {
        socket.to(roomId).emit("playerHasLeft");
        console.log(`Someones left room ${roomId}`);
    });

    socket.on('disconnect', () => {
        socket.adapter.rooms.forEach((val, key) => {
            socket.to(key).emit("playerLeft");
        })

        socket.disconnect();
    });
    
    socket.on("playerMoved", (board, isPlayer1Turn, roomId) => {
        socket.to(roomId).emit("updateBoard", board, !isPlayer1Turn);
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

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});