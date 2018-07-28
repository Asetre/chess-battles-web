import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { serverUrl } from '../../config'
import * as gameRepository from '../../repository/game'

const StyledLoadingScreen = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: linear-gradient(#555555, #222222);
.finding-game-load-screen {
height: $full;
background-color: $bg;
display: flex;
flex-direction: column;
align-items: center;
background-color: rgba(53, 53, 53, .8);
}

h2 {
  color: white;
  font-family: Abril Fatface;
  position: absolute;
  top: 30vh;
}

.finding-game-load-screen>h2 {
font-weight: 200;
font-style: italic;
margin-top: 80px;
margin-bottom: 50px;
}

.loader-container {
  margin-top: 60px;
width: 200px;
margin-bottom: 40px;
}

.finding-game-load-screen>button {
padding-bottom: 32px;
line-height: 5px;
width: 200px;
margin-bottom: 100px;
font-size: 20px;
background-color: $cancel;
padding: 25px;
}

.first-l {
width: 200px;
height: 200px;
border-radius: 200px/200px;
display: flex;
align-items: center;
justify-content: center;
animation-name: fade;
animation-duration: 1s;
animation-iteration-count: infinite;
animation-delay: 1.5s;
animation-direction: alternate;
animation-timing-function: ease-out;
}

.second-l {
width: 150px;
height: 150px;
border-radius: 150px/150px;
display: flex;
align-items: center;
justify-content: center;
animation-name: fade;
animation-duration: 1s;
animation-iteration-count: infinite;
animation-delay: 1s;
animation-direction: alternate;
animation-timing-function: ease-out;
}

.main-l {
width: 100px;
height: 100px;
background-color: #000000;
border-radius: 100px/100px;
animation-name: pulse;
animation-duration: 1s;
animation-iteration-count: infinite;
}
`

const StyledDashboard = styled.div`
box-sizing: border-box;
width: 100%;
height: 100vh;
background: linear-gradient(#555555, #222222);
padding: 100px 50px;

h2 {
  color: white;
  font-family: Butler;
  font-weight: lighter;
}

p {
  color: white;
}

button, select {
  font-size: 20px;
}
`

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
  }

  componentWillUnmount() {
    this.matchMakingRef.off()
  }  

  async handleGameSearch() {
    let { user } = this.props

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
    this.matchMakingRef = gameRepository.database.ref(`/match-making-que/${this.state.matchMakingID}`)
    this.matchMakingRef.on('value', (snap) => {
      try {
        let { gameID, matchFound } = snap.val()

        if (matchFound) {
          this.matchMakingRef.update({
            matchFound: true
          })
          this.matchMakingRef.remove()
          this.matchMakingRef.off()
          this.setState({redirect: gameID})
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  async cancelMatchMaking() {
    await gameRepository.cancelMatchMaking(this.state.matchMakingID)
    this.matchMakingRef.off()
    this.setState({loading: false})
  }

  render() {
    let user = this.props.user

    if(this.state.redirect) <Redirect push to={`/game/${this.state.redirect}`}/>

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
