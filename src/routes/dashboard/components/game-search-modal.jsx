import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import Btn from '../../../components/button'

const StyledGameSearchModal = styled.div`
`

class GameSearchModal extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedClass: 'Assasin'
    }

    this.findGame = this.findGame.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange(e) {
    this.setState({selectedClass: e.target.value})
  }

  findGame()  {
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

        <Btn text='Search for game' size='medium' onClick={this.findGame}></Btn>
      </StyledGameSearchModal>
    )
  }
}

const stateToProps = (state) => {
  return {}
}

const dispatchToProps = (dispatch) => {
  return {}
}

export default connect(stateToProps, dispatchToProps)(GameSearchModal)
