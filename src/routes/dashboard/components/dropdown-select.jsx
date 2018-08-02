import React from 'react'
import {StyledTextContainer, StyledMatchSelector, StyledTypeSelector, StyledTypeSelectorDrawer} from '../styles'

const pieceTypes = ['Assasin', 'Conqueror', 'Crusader', 'Knight', 'Mercenary']

export default class TypeSelector extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedType: 'Assasin',
      drawerOpen: false
    }

    this.handleDropDownClick = this.handleDropDownClick.bind(this)
    this.handleElementClick = this.handleElementClick.bind(this)
  }

  handleDropDownClick() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  handleElementClick(name) {
    this.setState({selectedType: name})
  }

  render() {
    let state = this.state
    let props = this.props

    return(
      <StyledTypeSelector>
        <StyledTypeSelectorDrawer drawerOpen={this.state.drawerOpen}>
          {
            pieceTypes.map((name, index) => {
              return(
                <div key={index} className="drawer-element" onClick={() => this.handleElementClick(name)}>
                  <p>{name}</p>
                </div>
              )
            })
          }
        </StyledTypeSelectorDrawer>

        <StyledTextContainer>
          <p>{state.selectedType}</p>
        </StyledTextContainer>

        <div className="box-arrow-down-container" onClick={this.handleDropDownClick}>
          <p>▼</p>
        </div>

        <StyledMatchSelector onClick={() => props.handleGameSearch(state.selectedType)}>
          <p className='static-text' >Play match as:</p>
          <p className='selected-piece-text'>{state.selectedType}</p>
        </StyledMatchSelector>

      </StyledTypeSelector>
    )
  }
}