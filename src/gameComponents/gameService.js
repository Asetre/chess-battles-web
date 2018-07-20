import Chess, * as Engine from '../chessEngine/chess_engine'
import * as GameRepository from './gameRepository'

export const identifyUserColorAndClass = (users, userID) => {
  let formatedUsers = formatUsersToIdentify(users)
  let playerOne = formatedUsers[0]
  let playerTwo = formatedUsers[1]
  let userGameInfo = playerOne.id === userID ? playerOne : playerTwo
  let opponentGameInfo = playerTwo.id !== userID ? playerTwo : playerOne

  return {userGameInfo, opponentGameInfo}
}

//Handles variable declaration for deconstruction
export const pieceMove = (oldPosition, newPosition, state) => {
  let pieceMove = {
    oldPosition,
    newPosition,
    playerColor: state.userGameInfo.color,
    gameID: state.gameID
  }
  let jsonBoard = Chess.boardToJSON()
  let updatedTurn = pieceMove.playerColor === 1 ? 0 : 1
  let updates = {
    turn: updatedTurn,
    boardState: jsonBoard
  }

  return {pieceMove, updatedTurn, updates}
}

export const gameOver = (winner, userGameInfo, opponentGameInfo) => {
  if(winner === userGameInfo.color) {
    let data = {
      winner: userGameInfo.id,
      loser: opponentGameInfo.id
    }
    GameRepository.gameOver(data)
  }
}

const formatUsersToIdentify = (users) => {
  return users.reduce((acc, curr, index) => {
    let user = curr.user,
      formatedUser = {
        id: user.id,
        color: index,
        type: user.type
      }
    acc.push(formatedUser)
    return acc
  }, [])
}
