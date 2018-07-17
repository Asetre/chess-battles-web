export const update_user_profile = 'update user profile'
export const update_game_id = 'update current game id'

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
