const roomController = require("./roomController");
const Port = require('../constant/Port');
const gameController = require("./gameController");

module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log("New Connection : " + socket.id)

        roomController(socket, io)
        gameController(socket, io)

        socket.on("nodeport", (data) => {
            console.log("recieve:", data)
            socket.emit("iosport", {
                msg: "registered as " + data["name"]
            })
        })

        socket.on("disconnecting", () => {
            console.log("Disconnected:", socket.id)
            socket.rooms.forEach(e => {
                io.to(e).emit(Port.game_disconnected)
            });
          });
    });

    
}