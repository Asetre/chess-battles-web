import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

//Components
import Hero from './hero'
import Demo from './demo_board'

const StyledLanding = styled.div`
`

var LandingPage = (props) => {
    return(
        <StyledLanding>
            <Hero />
            <Demo />
        </StyledLanding>
    )
}

var stateToProps = state => {
    return {}
}

var dispatchToProps = dispatch => {
    return {}
}

export default connect(stateToProps, dispatchToProps)(LandingPage)
