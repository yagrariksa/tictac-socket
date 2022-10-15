const Port = require("../constant/Port");

async function joinGame(socket, data, io) {
    // console.log("New User join:", data);

    const connectedSocket = io.sockets.adapter.rooms.get(data.roomId);
    const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);

    if (socketRooms.length > 0) {
        socket.emit(Port.join_game_error, {
            error: "Already Join Room"
        });
    } else if (connectedSocket && connectedSocket.size === 2) {
        socket.emit(Port.join_game_error, {
            error: "Room is full, please choose another room to play!"
        });
    } else {
        await socket.join(data.roomId);
        socket.emit(Port.join_game_response);

        if (io.sockets.adapter.rooms.get(data.roomId).size === 2) {
            socket.emit(Port.game_start, {
                "color": "red",
                "turn": "false"
            });
            socket.to(data.roomId).emit(Port.game_start, {
                "color": "blue",
                "turn": "true"
            });
        }
    }
}

async function leaveGame(socket, data, io) {
    const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);

    if (socketRooms.length > 0){
        await socket.leave(data.roomId);
        socket.emit(Port.leave_response)
    }
    
}


module.exports = (socket, io) => {
    socket.on(Port.join_game, (data) => {
        joinGame(socket, data, io);
    });

    socket.on(Port.leave, (data) => {
        leaveGame(socket, data, io);
    });
}