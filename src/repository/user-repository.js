
import axios from 'axios'
import Auth0Lock from 'auth0-lock'
import { serverUrl } from '../config'

const lockOptions = {
  autoclose: true,
  auth: {
    redirect: false
  }
}

export const lock = new Auth0Lock(
  'M1pfmr2L43kkkgA4wo7R1y26EsPhahAd',
  'paul-asetre.auth0.com',
  lockOptions
)

export const persistUserSession = (cb) => {
  let accessToken = localStorage.getItem('accessToken')
  let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))

  if (expiresAt > new Date().getTime()) {
    getUserInfo(accessToken, expiresAt, cb)
    return true
  }
  return false
}

export const getUserInfo = (accessToken, expiresIn, cb) => {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(accessToken, function (err, profile) {
    if (err) {
      //eslint-disable-next-line
      console.log(err)
      return err
    }

    if (profile.sub) {
      return axios.get(`${serverUrl}/users/login/${profile.sub}/${profile.nickname}`)
        .then((res) => {
          if (res.status !== 200) throw 'Failed to get user profile'
          const userProfile = res.data

          if (expiresIn) {
            var expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime())
          } else {
            var expiresAt = expiresIn
          }

          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('expiresAt', expiresAt)

          cb(userProfile)
        })
        .catch((err) => {
          //eslint-disable-next-line
          console.log(err)
        })
    }

  })
}

export const initAuthListener = (cb) => {
  lock.on('authenticated', function (authResult) {
    getUserInfo(authResult.accessToken, authResult.expiresIn, cb)
  })
}
