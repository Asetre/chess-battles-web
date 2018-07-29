import styled from 'styled-components'
import {BtnPrimary, BtnSecondary} from '../../components/button'
import img from '../../assets/battle-1846807_1280.jpg'

export const StyledDemo = styled.div`
margin: 0 200px;
display: grid;
grid-template-columns: 2fr 1fr;
grid-teplates-rows: 1fr 1fr 1fr 1fr;
grid-template-areas:
"board white"
"board vs"
"board black"
"board reset";

>.board-container {
  grid-area: board;
  width: 700px;
  height: 700px;
  margin: auto;
}

.demo-player-one-container {
  grid-area: white;
  padding: 40px 0;
  >p {
    color: #95989A;
    font-family: Liberation Sans;
    margin: 20px 0;
  }
}

.demo-player-two-container {
  grid-area: black;
  >p {
    color: #95989A;
    font-family: Liberation Sans;
    margin: 20px 0;
  }
}

.demo-vs {
  grid-area: vs;
  font-family: Abril Fatface;
  font-size: 20px;
  color: #FC4E68;
  text-align: center;
}

select {
  padding: 5px 50px;
  border-bottom: 1px solid black;
  border-radius: 0;
  font-size: 24px;
  color: #f49542;
  font-family: Liberation Sans;
  appearance: none;
  background: #fff url('https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_down_48px-128.png') no-repeat;
   background-size: 20px;
    background-position:  right 10px center;
    display: block;
}
`

export const Hero = styled.div`
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

export const ImgContainer = styled.div`
background-image: url(${img});
background-size: cover;
background-repeat: no-repeat;
background-position: center;
height: 100%;
width: 100%;
opacity: .2;
position: absolute;
`

export const HeroHeader = styled.h1`
margin-bottom: 200px;
font-family: Butler;
font-size: 46px;
color: white;
`

export const DemoSection = styled.div`
>h2 {
color: #4D24CE;
font-family: Butler;
font-size: 34px;
text-align: center;
margin: 60px 0;
}
`

export const StyledLanding = styled.div`
${BtnSecondary} {
  margin: 30px auto;
}
>p {
  text-align: center;
  color: #62BCFA;
}
margin-bottom: 150px;
`