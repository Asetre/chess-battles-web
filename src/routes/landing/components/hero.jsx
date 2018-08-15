import React from 'react'
import {ImgContainer, HeroHeader, Hero} from '../styles'
import {BtnPrimary} from '../../../components/button'


export default () => {
  return (
    <Hero className="flex flex-col align-items-center justify-content-center">
      <ImgContainer></ImgContainer>
      <HeroHeader>Experience a game of chess like never before</HeroHeader>
      <BtnPrimary>Play for free</BtnPrimary>
    </Hero>
  )
}
