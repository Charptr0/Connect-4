const server = require("http").createServer();
require("dotenv").config();
const io = require("socket.io")(server, {
    cors : {
        origin : [process.env.FRONTEND_HOST]
    },
});

io.on("connection", socket => {
    socket.on("joinRoom", roomId => {
        console.log(`Joining room ${roomId}`);
        socket.join(roomId);
        socket.to(roomId).emit("joinedRoom");
        const clients = io.sockets.adapter.rooms.get(roomId);

        console.log(clients.size);
    });

    socket.on("playerMoved", (board, isPlayer1Turn) => {
        socket.broadcast.emit("updateBoard", board, !isPlayer1Turn);
    });

});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});