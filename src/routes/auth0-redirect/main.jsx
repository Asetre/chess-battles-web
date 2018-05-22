import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import Auth from '../../auth0.js'
import {serverUrl} from '../../config'
import * as actions from '../../redux/actions'

const auth = new Auth()

class HandleAuth extends React.Component {
  constructor(props) {
    super()
    this.state = {
      redirect: false
    }

    this.handleAuth = this.handleAuth.bind(this)
    this.handleAuth(props)
  }

  handleAuth(nextState, replace) {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication()
      return auth.getProfile()
      .then(profile => {
        if(profile && auth.isAuthenticated()) {
          if(profile.sub) {
            axios.get(`${serverUrl}/users/login/${profile.sub}/${profile.nickname}`)
            .then(res => {
              if(res.status !== 200) throw 'Failed to get user profile'
              this.props.updateUserProfile(res.data)
              this.setState({redirect: true})
            })
          }
        }
      })
      .catch(err => {
        console.log(err)
        //open failed login modal
        this.setState({redirect: true})
      })
    }else {
      this.setState({redirect: true})
    }
  }

  render() {
    return this.state.redirect
    ? <Redirect to='/' />
    : <h2>Loading</h2>
  }
}

const stateToProps = state => {
  return {}
}

const dispatchToProps = dispatch => {
  return {
    updateUserProfile: data => {
      dispatch(actions.updateUserProfile(data))
    }
  }
}
export default connect(stateToProps, dispatchToProps)(HandleAuth)
