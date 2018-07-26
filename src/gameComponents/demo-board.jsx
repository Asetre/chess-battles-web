import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Chess, * as Engine from '../chessEngine/chess_engine'
import {BtnSecondary} from '../components/button'
import * as actions from '../redux/actions'

//components
import Board from './board'

const StyledDemo = styled.div`
margin: 0 200px;
display: grid;
grid-template-columns: 2fr 1fr;
grid-teplates-rows: 1fr 1fr 1fr 1fr;
grid-template-areas:
"board white"
"board vs"
"board black"
"board reset";

>.board-container {
  grid-area: board;
  width: 700px;
  height: 700px;
  margin: auto;
}

.demo-player-one-container {
  grid-area: white;
  padding: 40px 0;
  >p {
    color: #95989A;
    font-family: Liberation Sans;
    margin: 20px 0;
  }
}

.demo-player-two-container {
  grid-area: black;
  >p {
    color: #95989A;
    font-family: Liberation Sans;
    margin: 20px 0;
  }
}

.demo-vs {
  grid-area: vs;
  font-family: Abril Fatface;
  font-size: 20px;
  color: #FC4E68;
  text-align: center;
}

select {
  padding: 5px 50px;
  border-bottom: 1px solid black;
  border-radius: 0;
  font-size: 24px;
  color: #f49542;
  font-family: Liberation Sans;
  appearance: none;
  background: #fff url('https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_down_48px-128.png') no-repeat;
   background-size: 20px;
    background-position:  right 10px center;
    display: block;
}
`
class DemoBoard extends React.Component {
  constructor() {
    super()
    this.state = {
      white: {
        color: 1,
        type: 'Assasin'
      },
      black: {
        color: 0,
        type: 'Assasin'
      },
      config: {
        reversed: false,
        demo: true
      }
    }

    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.getTypeInfo = this.getTypeInfo.bind(this)

    Chess.resetBoard()
    Chess.setUpGame(this.state.white, this.state.black)
  }

  getTypeInfo(type) {
    switch (type) {
    case 'Conqueror':
      return 'Try moving the King to see the true power of a conqueror'

    case 'Crusader':
      return 'Move the rook to see the crusader come to life'

    case 'Assasin':
      return 'The Bishop waits for an opportunity to sneak into the back lines'

    case 'Knight':
      return 'Knowing no fear, the knight jumps into battle'

    case 'Mercenary':
      return 'Spending time at the front lines, the pawns have proven themselves to be true warriors'

    default:
      return 'Unable to retrieve data'
    }
  }

  handleSelectChange(e) {
    let str = e.target.value
    let color = parseInt(str[str.length - 1])
    let type = str.slice(0, str.length - 1)


    Chess.resetBoard()

    if(color === 1) {
      this.setState({white: {color, type}})
      Chess.setUpGame(this.state.black, {color, type})
    }else {
      this.setState({black: {color, type}})
      Chess.setUpGame(this.state.white, {color, type})
    }
    this.child.forceUpdate()
  }

  handleReset() {
    Chess.resetBoard()
    Chess.setUpGame(this.state.white, this.state.black)
    this.child.forceUpdate()
  }

  render() {
    return(
      <StyledDemo>
        <div className='board-container'>
          <Board ref={(instance) => this.child = instance} {...this.state.config}/>
        </div>
        <div className='demo-player-one-container'>
          <select onChange={this.handleSelectChange}>
            <option value="Assasin0">Assasin</option>
            <option value="Conqueror0">Conqueror</option>
            <option value="Crusader0">Crusader</option>
            <option value="Knight0">Knight</option>
            <option value="Mercenary0">Mercenary</option>
          </select>
          <p className="type-description">{this.getTypeInfo(this.state.black.type)}</p>
        </div>
        <p className='demo-vs'>VS</p>
        <div className='demo-player-two-container'>
          <select onChange={this.handleSelectChange}>
            <option value="Assasin1">Assasin</option>
            <option value="Conqueror1">Conqueror</option>
            <option value="Crusader1">Crusader</option>
            <option value="Knight1">Knight</option>
            <option value="Mercenary1">Mercenary</option>
          </select>
          <p className="type-description">{this.getTypeInfo(this.state.white.type)}</p>
        </div>
        <BtnSecondary onClick={this.handleReset}>Reset</BtnSecondary>
      </StyledDemo>
    )
  }
}

const stateToProps = state => {
  return {
  }
}

const dispatchToProps = dispatch => {
  return {
  }
}

export default connect(stateToProps, dispatchToProps)(DemoBoard)
