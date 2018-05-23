import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import Btn from '../../../components/button'
import {serverUrl} from '../../../config'
import axios from 'axios'
import firebase from 'firebase'
import * as actions from '../../../redux/actions'

const StyledGameSearchModal = styled.div`
`

class GameSearchModal extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedClass: 'Assasin',
      matchMakingQueId: null
    }

    this.matchMakingRef = null
    this.findGame = this.findGame.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.cancelMatchMaking = this.cancelMatchMaking.bind(this)
  }

  componentDidMount() {
    this.database = firebase.database()
  }

  handleSelectChange(e) {
    this.setState({selectedClass: e.target.value})
  }

  findGame() {
    let props = this.props
    const {user} = props

    let matchMakingInfo = {
      user: {
        id: user._id,
        username: user.username,
        selectedClass: this.state.selectedClass,
        win: user.win,
        loss: user.loss
      },
      matchFound: false,
      gameID: null
    }

    return axios.post(`${serverUrl}/game/findGame`, matchMakingInfo)
    .then((res) => {
      this.setState({matchMakingQueId: res.data})
      this.matchMakingRef = this.database.ref(`/match-making-que/${this.state.matchMakingQueId}`)
      this.matchMakingRef.on('value', (snap) => {
        const userQue = snap.val()
        if(userQue.matchFound) {
          console.log('match found')
        }
      })
    })
  }

  cancelMatchMaking() {
    return axios.post(`${serverUrl}/game/cancelMatchMaking/${this.state.matchMakingQueId}`)
    .then((res) => {
    })
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <StyledGameSearchModal>
        <select value={this.state.selectedClass} onChange={this.handleSelectChange}>
          <option value="Assasin">Assasin</option>
          <option value="Conqueror">Conqueror</option>
          <option value="Crusader">Crusader</option>
          <option value="Knight">Knight</option>
          <option value="Mercenary">Mercenary</option>
        </select>

        <Btn text='Search for game' size='medium' onClick={this.findGame}/>
        <Btn text='Cancel search' size='medium' onClick={this.cancelMatchMaking} />
      </StyledGameSearchModal>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    updateGameID: (id) => {
      dispatch(actions.updateGameID(id))
    }
  }
}

export default connect(stateToProps, dispatchToProps)(GameSearchModal)
