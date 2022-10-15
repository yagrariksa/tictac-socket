const Port = require('../constant/Port')

async function updateGame(socket, data, io) {
    await socket.to(data.roomId).emit(Port.game_matrix_response, {
        "matrix": data.matrix
    })
}

async function broadcastGameWinner(socket, data, io) {
    await socket.to(data.roomId).emit(Port.game_looser)
}

module.exports = (socket, io) => {
    socket.on(Port.game_matrix_update, (data) => {
        updateGame(socket, data, io)
    })

    socket.on(Port.game_winner, (data) => {
        broadcastGameWinner(socket, data, io)
    })
}