import axios from 'axios'
import firebase from 'firebase'
import {serverUrl} from '../config'
import {firebaseConfig} from '../config'

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
const matchMakingRef = database.ref('match-making-que')

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

export const cancelMatchMaking = (matchMakingQueID) => {
    return axios.post(`${serverUrl}/game/cancelMatchMaking/${this.state.matchMakingQueId}`)
        .then((res) => {
            return res
        })
}
