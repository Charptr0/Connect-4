const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors : {
        origin : ["http://localhost:3000"]
    },
});

io.on("connection", socket => {
    socket.on("playerMoved", (board, isPlayer1Turn) => {
        socket.broadcast.emit("updateBoard", board, !isPlayer1Turn);
    });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});