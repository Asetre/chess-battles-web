import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { serverUrl } from '../../config'
import * as gameRepository from '../../repository/gameRepository'
import {StyledDashboard, StyledLoadingScreen} from './styles'

class Dashboard extends React.Component {

  constructor() {
    super()

    this.state = {
      selectedType: 'Assasin',
      loading: false,
      matchMakingID: null,
      redirect: null
    }

    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleGameSearch = this.handleGameSearch.bind(this)
    this.cancelMatchMaking = this.cancelMatchMaking.bind(this)
    this.setupEventListeners = this.setupEventListeners.bind(this)
    this.removeMatchMakingListener = this.removeMatchMakingListener.bind(this)
  }

  componentWillUnmount() {
    if(this.matchMakingRef) {
      this.removeMatchMakingListener()
    }
  }  

  async handleGameSearch() {
    let { user } = this.props

    if(this.state.loading && this.matchMakingRef) return

    let userMatchMakingInfo = {
      id: user._id,
      username: user.username,
      type: this.state.selectedType,
      win: user.win,
      loss: user.loss
    }

    let matchMakingID = await gameRepository.addToMatchMakingQue(userMatchMakingInfo)

    this.setState({matchMakingID})
    this.setupEventListeners()
    this.setState({loading: true})
  }

  handleSelectChange(e) {
    let selectedType = e.target.value

    this.setState({selectedType})
  }

  setupEventListeners() {
    this.matchMakingRef = gameRepository.initializeMatchMakingListener(this.state.matchMakingID)
    this.matchMakingRef.on('value', (snap) => {
      try {
        let { gameID, matchFound } = snap.val()

        if (matchFound) {
          this.matchMakingRef.update({
            matchFound: true
          })
          this.setState({redirect: gameID})
          this.removeMatchMakingListener()
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  async cancelMatchMaking() {
    await gameRepository.cancelMatchMaking(this.state.matchMakingID)
    this.setState({loading: false})
  }

  removeMatchMakingListener() {
    gameRepository.removeMatchMakingListeners()
  }

  render() {
    let user = this.props.user

    if(this.state.redirect) return <Redirect push to={`/game/${this.state.redirect}`}/>

    if(this.state.loading) {
      return(
        <StyledLoadingScreen>
          <h2>Looking for a game...</h2>
          <div className="loader-container">
            <div className="first-l">
              <div className="second-l">
                <div className="main-l">
                </div>
              </div>
            </div>
          </div>
          <button onClick={this.cancelMatchMaking}>Cancel</button>
        </StyledLoadingScreen>
      )
    }


    return(
      <StyledDashboard>
        <h2>{user ? user.username : null}</h2>
        <div className="user-info-container">
          <p>wins: {user ? user.wins : null}</p>
          <p>loss: {user ? user.loss : null}</p>
        </div>

        <select onChange={this.handleSelectChange}>
          <option value="Assasin">Assasin</option>
          <option value="Conqueror">Conqueror</option>
          <option value="Crusader">Crusader</option>
          <option value="Knight">Knight</option>
          <option value="Mercenary">Mercenary</option>
        </select>

        <button onClick={this.handleGameSearch}>Search for game as: {this.state.selectedType}</button>
      </StyledDashboard>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(stateToProps)(Dashboard)
