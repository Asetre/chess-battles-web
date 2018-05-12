export const init_board = 'init_board'
export const update_selected_piece = 'update selected piece'
export const update_valid_moves = 'update valid moves'

export function updateGame(game) {
    return {
        type: init_board,
        payload: game
    }
}

export function updatePieceSelected(pos) {
    return {
        type: update_selected_piece,
        payload: pos
    }
}

export function updateValidMoves(arr) {
    return {
        type: update_valid_moves,
        payload: arr
    }
}
