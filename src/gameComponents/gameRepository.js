import firebase from 'firebase'
import io from 'socket.io-client'
const database = firebase.database()

var gameRef = null
var socket = null

export const initializeListeners = (gameID) => {
  gameRef = database.ref(`/games/${gameID}`)
  return socket = io('http://localhost:8080')
}

export const joinRoom = (gameID) => {
  socket.emit('join room', gameID)
}

export const onPieceMove = (callback) => {
  socket.on('piece move', callback)
}

export const emitPieceMove = (data, updates) => {
  socket.emit('piece move', data)
  updateGameInfo(updates)
}

export const updateGameInfo = (data) => {
  gameRef.update(data)
}

export const gameOver = (data) => {
  socket.emit('game over', data)
}

export const getGameInfo = () => {
  return gameRef.once('value')
    .then((snap) => snap.val())
}

export const removeSocketListener = () => {
  socket.off()
}

export const removeListeners = () => {
  gameRef.off()
  socket.off()
}
