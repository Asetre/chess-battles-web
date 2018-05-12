import React from 'react'

import styled from 'styled-components'
import img from '../../../assets/battle-1846807_1280.jpg'

const Hero = styled.div`
    width: 100%;
    height: 600px;
    background: linear-gradient(#6534FF, #331A80);
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
`

const ImgContainer = styled.div`
    background-image: url(${img});
    height: 100%;
    width: 100%;
    opacity: .2;
    background-size: cover;
    position: absolute;
`

const HeroHeader = styled.h1`
    font-family: Butler;
    color: white;
`

export default () => {
    return(
        <Hero>
            <ImgContainer></ImgContainer>
            <HeroHeader>Experience a game of chess like never before</HeroHeader>
        </Hero>
    )
}
