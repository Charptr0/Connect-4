const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors : {
        origin : ["http://localhost:3000"]
    },
});

io.on("connection", socket => {
    console.log("A user has connected");

    socket.on("send_message", msg => {
        socket.broadcast.emit("got_message", msg);
    })
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});