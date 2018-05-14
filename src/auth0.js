import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'paul-asetre.auth0.com',
    clientID: 'M1pfmr2L43kkkgA4wo7R1y26EsPhahAd',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://paul-asetre.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
