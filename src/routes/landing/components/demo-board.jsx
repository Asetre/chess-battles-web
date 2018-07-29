import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Chess, * as Engine from '../../../chessEngine/chess_engine'
import {BtnSecondary} from '../../../components/button'
import * as actions from '../../../redux/actions'
import {StyledDemo} from '../styles'

//components
import Board from '../../../gameComponents/board'

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
        <div className='demo-player-one-container player-container'>
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
        <div className='demo-player-two-container player-container'>
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
