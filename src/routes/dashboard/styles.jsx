import styled from 'styled-components'

export const StyledLoadingScreen = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: linear-gradient(#555555, #222222);
.finding-game-load-screen {
height: $full;
background-color: $bg;
display: flex;
flex-direction: column;
align-items: center;
background-color: rgba(53, 53, 53, .8);
}

h2 {
  color: white;
  font-family: Abril Fatface;
  position: absolute;
  top: 30vh;
}

.finding-game-load-screen>h2 {
font-weight: 200;
font-style: italic;
margin-top: 80px;
margin-bottom: 50px;
}

.loader-container {
  margin-top: 60px;
width: 200px;
margin-bottom: 40px;
}

.finding-game-load-screen>button {
padding-bottom: 32px;
line-height: 5px;
width: 200px;
margin-bottom: 100px;
font-size: 20px;
background-color: $cancel;
padding: 25px;
}

.first-l {
width: 200px;
height: 200px;
border-radius: 200px/200px;
display: flex;
align-items: center;
justify-content: center;
animation-name: fade;
animation-duration: 1s;
animation-iteration-count: infinite;
animation-delay: 1.5s;
animation-direction: alternate;
animation-timing-function: ease-out;
}

.second-l {
width: 150px;
height: 150px;
border-radius: 150px/150px;
display: flex;
align-items: center;
justify-content: center;
animation-name: fade;
animation-duration: 1s;
animation-iteration-count: infinite;
animation-delay: 1s;
animation-direction: alternate;
animation-timing-function: ease-out;
}

.main-l {
width: 100px;
height: 100px;
background-color: #000000;
border-radius: 100px/100px;
animation-name: pulse;
animation-duration: 1s;
animation-iteration-count: infinite;
}
`

export const StyledDashboard = styled.div`
box-sizing: border-box;
width: 100%;
height: 100vh;
background: linear-gradient(#555555, #222222);
padding: 100px 50px;

h2 {
  color: white;
  font-family: Butler;
  font-weight: lighter;
}

p {
  color: white;
}

button, select {
  font-size: 20px;
}
`