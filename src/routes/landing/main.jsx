import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

//Components
import Hero from './components/hero'
import DemoBoard from '../../gameComponents/demo-board'
import Btn from '../../components/button'

const StyledLanding = styled.div`
`

var LandingPage = (props) => {
    return(
        <StyledLanding>
            <Hero />
            <DemoBoard />
            <Link to='/dashboard'>Dashboard</Link>
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
