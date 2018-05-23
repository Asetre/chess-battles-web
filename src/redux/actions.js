export const init_board = 'init_board'
export const update_selected_piece = 'update selected piece'
export const update_valid_moves = 'update valid moves'
export const update_user_profile = 'update user profile'
export const update_game_id = 'update current game id'

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

export function updateUserProfile(user) {
  return {
    type: update_user_profile,
    payload: user
  }
}

export function updateGameID(id) {
  return {
    type: update_game_id,
    payload: id
  }
}
