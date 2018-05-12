import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

//Components
import Hero from './components/hero'

const StyledLanding = styled.div`
`

var LandingPage = (props) => {
    return(
        <StyledLanding>
            <Hero />
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
