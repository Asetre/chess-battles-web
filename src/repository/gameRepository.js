import firebase from 'firebase'
import io from 'socket.io-client'
import axios from 'axios'
import {serverUrl, firebaseConfig, gameServerUrl} from '../config'

firebase.initializeApp(firebaseConfig)
const database = firebase.database()


var gameRef = null
var socket = null
var matchMakingRef = null

export const initializeListeners = (gameID) => {
  gameRef = database.ref(`/games/${gameID}`)
  return socket = io(`${gameServerUrl}`)
}

export const initializeMatchMakingListener = (matchMakingID) => {
  return matchMakingRef = database.ref(`match-making-que/${matchMakingID}`)
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


export const addToMatchMakingQue = (userInfo) => {
  const matchMakingInfo = {
    user: {...userInfo},
    matchFound: false,
    gameID: null
  }

  return axios.post(`${serverUrl}/game/findGame`, matchMakingInfo)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
    })
}

export const cancelMatchMaking = (matchMakingId) => {
  return axios.post(`${serverUrl}/game/cancelMatchMaking/${matchMakingId}`)
    .then((res) => {
      return res
    })
}

export const removeMatchMakingListeners = () => {
}