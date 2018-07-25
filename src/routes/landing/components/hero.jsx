import React from 'react'
import styled from 'styled-components'
import {BtnPrimary} from '../../../components/button'
import img from '../../../assets/battle-1846807_1280.jpg'

const Hero = styled.div`
width: 100%;
height: 850px;
background: linear-gradient(#6534FF, #331A80);
position: relative;
clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

${BtnPrimary} {
  font-size: 30px;
}
`

const ImgContainer = styled.div`
background-image: url(${img});
background-size: cover;
background-repeat: no-repeat;
background-position: center;
height: 100%;
width: 100%;
opacity: .2;
position: absolute;
`

const HeroHeader = styled.h1`
margin-bottom: 200px;
font-family: Butler;
font-size: 46px;
color: white;
`

export default () => {
  return (
    <Hero>
      <ImgContainer></ImgContainer>
      <HeroHeader>Experience a game of chess like never before</HeroHeader>
      <BtnPrimary>Play for free</BtnPrimary>
    </Hero>
  )
}
