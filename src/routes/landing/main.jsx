import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {BtnSecondary} from '../../components/button'
import styled from 'styled-components'

//Components
import Hero from './components/hero'
import DemoBoard from '../../gameComponents/demo-board'

const DemoSection = styled.div`
>h2 {
color: #4D24CE;
font-family: Butler;
font-size: 34px;
text-align: center;
margin: 60px 0;
}
`

const StyledLanding = styled.div`
${BtnSecondary} {
  margin: 30px auto;
}
>p {
  text-align: center;
  color: #62BCFA;
}
margin-bottom: 150px;
`

const LandingPage = () => {
  return (
    <StyledLanding>
      <Hero />

      <DemoSection>
        <h2>Each class has a unique advantage</h2>
        <DemoBoard/>
      </DemoSection>

      <BtnSecondary className='cta-secondary'>Sign up to get started</BtnSecondary>
      <p className='cta-login'>Login</p>
      <Link to='/dashboard'>Dashboard</Link>
    </StyledLanding>
  )
}

export default LandingPage