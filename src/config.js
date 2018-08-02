const prod = process.env.node_env === 'production' ? true : false

export const serverUrl =  prod ? 'https://gurren.paulasetre.com' : 'http://localhost:8000'
export const gameServerUrl =  prod ? 'https://lagann.paulasetre.com' : 'http://localhost:8080'

export const firebaseConfig = {
  apiKey: 'AIzaSyAhmEUCA4_nLb9riGG0WpeKmzPXeneYmog',
  authDomain: 'chess-battles-85633.firebaseapp.com',
  databaseURL: 'https://chess-battles-85633.firebaseio.com',
  projectId: 'chess-battles-85633',
  storageBucket: 'chess-battles-85633.appspot.com',
  messagingSenderId: '1052100348307'
}
