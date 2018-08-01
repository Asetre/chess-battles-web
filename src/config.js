export const serverUrl = 'https://gurren.paulasetre.com'
export const gameServerUrl = 'https://lagann.paulasetre.com'

export const firebaseConfig = {
  apiKey: process.env.firebase_apiKey || 'AIzaSyAhmEUCA4_nLb9riGG0WpeKmzPXeneYmog',
  authDomain: process.env.firebase_authDomain || 'chess-battles-85633.firebaseapp.com',
  databaseURL: process.env.firebase_databaseUrl || 'https://chess-battles-85633.firebaseio.com',
  projectId: process.env.firebase_projectID || 'chess-battles-85633',
  storageBucket: process.env.firebase_storageBucket || 'chess-battles-85633.appspot.com',
  messagingSenderId: process.env.firebase_messaginSenderID || '1052100348307'
}
