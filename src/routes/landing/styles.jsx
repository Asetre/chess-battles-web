import styled from 'styled-components'
import { BtnPrimary, BtnSecondary } from '../../components/button'
import img from '../../assets/battle-1846807_1280.jpg'

export const StyledDemo = styled.div`
box-sizing: border-box;
width: 100%;
padding: 0 100px;
display: grid;
column-gap: 50px;
grid-template-areas:
"board white"
"board vs"
"board black"
"board reset";


${BtnSecondary} {
  grid-area: reset;
}

.board-container {
  grid-area: board;
  justify-self: end;
  width: 700px;
  height: 700px;
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

@media (max-width: 1300px) {
  grid-template-areas:
  "white vs black"
  "reset reset reset"
  "board board board";

  .board-container {
    justify-self: center;
  }

  .demo-player-one-container {
    padding: 0;
  }

  .player-container {
    max-width: 350px;
  }
  ${BtnSecondary} {
    justify-self: center;
  }

  select {
    margin: 0 auto;
  }
}

@media (max-width: 950px) {
  padding: 0 10px;
  .board-container {
    width: 90%;
  }
}

@media (max-width: 570px) {
  grid-template-areas:
  "white"
  "vs"
  "black"
  "reset"
  "board";
  justify-content: center;

  column-gap: none;

  .board-container {
    width: 100%;
  }
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
margin-left: 40px;
margin-right: 40px;
font-family: Butler;
font-size: 46px;
color: white;
@media (max-width: 550px) {
  font-size: 30px;
}
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