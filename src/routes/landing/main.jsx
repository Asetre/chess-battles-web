import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {BtnSecondary} from '../../components/button'

//Components
import Hero from './components/hero'
import DemoBoard from './components/demo-board'
import {StyledLanding, DemoSection} from './styles'

const LandingPage = () => {
  return (
    <StyledLanding>
      <Hero />

      <DemoSection>
        <h2>Each class has a unique advantage</h2>
        <DemoBoard/>
      </DemoSection>

      <BtnSecondary className="cta-secondary">Sign up to get started</BtnSecondary>
      <p className="cta-login">Login</p>
    </StyledLanding>
  )
}

export default LandingPage