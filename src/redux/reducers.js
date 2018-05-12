import * as actions from './actions'

export var initialBoardState = {
    board: null,
    validMoves: [],
    pieceSelected: null
}


export default function reducer(state=initialBoardState, action) {

    let payload = action.payload

    switch (action.type) {
        case actions.init_board:
        return {...state, game: payload}

        case actions.update_selected_piece:
        return {...state, pieceSelected: payload}

        case actions.update_valid_moves:
        return {...state, validMoves: payload}

        default:
        return state
    }
}