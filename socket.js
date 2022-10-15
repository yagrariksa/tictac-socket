const {
    Server
} = require("socket.io");

const mainController = require("./api/controllers/mainController")

module.exports = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    mainController(io)

    return io
}