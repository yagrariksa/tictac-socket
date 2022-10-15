class Port {
    static join_game = "join_game"
    static join_game_response = "join_game_response"
    static join_game_error = "join_game_error"

    static leave = "leave_game"
    static leave_response = "leave_game_response"

    static game_start = "game_start"
    static game_disconnected = "game_player_disconnected"

    static game_matrix_update = "game_matrix_send"
    static game_matrix_response = "game_matrix_recieve"

    static game_winner = "game_winner"
    static game_looser = "game_looser"

}

module.exports = Port