var connections = []
const { Server } = require("socket.io");
const io = new Server({ /* options */ });

io.on("connection", (socket) => {
    connections.push(socket)
    console.log("Connection : " + connections.length)

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1)
        console.log("Disconnect")
    })

    socket.on('nodeport', (data) => {
        console.log(data)
        io.emit('iosport', {msg: "hi IOS"})
        // io.socket.emit('iosport', {msg: "hi IOS"})
    })
});

io.listen(3000);
console.log("socket.io listening on 3000")
