import React from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react'
import { connect } from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-redux'
import { Redirect, withRouter } from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-router-dom'
import styled from 'styled-components'
import {BtnPrimary} from '../../../components/button'
import { serverUrl } from '../../../config'
import * as actions from '../../../redux/actions'
import * as gameRepository from '../../../repository/game'

const StyledGameSearchModal = styled.div`
`

class GameSearchModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedClass: 'Assasin',
      matchMakingQueID: null
    }

    this.matchMakingRef = null

    this.findGame = this.findGame.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.cancelMatchMaking = this.cancelMatchMaking.bind(this)
    this.setupEventListeners = this.setupEventListeners.bind(this)
  }

  handleSelectChange(e) {
    this.setState({ selectedClass: e.target.value })
  }

  async findGame() {
    let { user } = this.props

    let userMatchMakingInfo = {
      id: user._id,
      username: user.username,
      type: this.state.selectedClass,
      win: user.win,
      loss: user.loss
    }

    let matchMakingQueID = await gameRepository.addToMatchMakingQue(userMatchMakingInfo)

    this.setState({ matchMakingQueID: matchMakingQueID })

    this.setupEventListeners()
  }

  setupEventListeners() {
    this.matchMakingRef = gameRepository.database.ref(`/match-making-que/${this.state.matchMakingQueID}`)
    this.matchMakingRef.on('value', (snap) => {
      try {
        let { gameID, matchFound } = snap.val()

        if (matchFound) {
          this.matchMakingRef.update({
            matchFound: true
          })
          this.props.history.push(`/game/${gameID}`)
          this.matchMakingRef.remove()
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  removeEventListeners() {
    this.matchMakingRef.off()
  }

  async cancelMatchMaking() {
    await gameRepository.cancelMatchMaking(this.state.matchMakingQueID)
    this.matchMakingRef.off()
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  render() {
    return (
      <StyledGameSearchModal>
        <select value={this.state.selectedClass} onChange={this.handleSelectChange}>
          <option value="Assasin">Assasin</option>
          <option value="Conqueror">Conqueror</option>
          <option value="Crusader">Crusader</option>
          <option value="Knight">Knight</option>
          <option value="Mercenary">Mercenary</option>
        </select>



        <BtnPrimary onClick={this.findGame}>Search for game</BtnPrimary>
        <BtnPrimary onClick={this.cancelMatchMaking}>Cancel search</BtnPrimary>
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

export default withRouter(connect(stateToProps, dispatchToProps)(GameSearchModal))
