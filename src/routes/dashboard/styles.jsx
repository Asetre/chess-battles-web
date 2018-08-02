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

.loading-btn-cancel {
  font-size: 20px;
  padding: 5px 50px;
  color: white;
  background-color: #FC4E68;
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

select {
  border-radius: 0;
}
`

export const StyledTextContainer = styled.div`
box-sizing: border-box;
width: 100%;
padding: 10px 20px;
position: relative;
background-color: white;
grid-area: text
display: flex;
justify-content: center;
align-items: center;

p {
  font-size: 22px;
  color: black;
}

`
export const StyledMatchSelector = styled.div`
width: 100%;
grid-area: matchBtn;
background-color: #FC4E68;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

>p {
  color: white;
}
`

export const StyledTypeSelectorDrawer = styled.div`
display: ${(props) => props.drawerOpen ? 'block' : 'none'}
grid-area: dropdown;
background-color: white;
width: 100%;
box-sizing: border-box;

.drawer-element {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

p {
  color: black;
  font-size: 18px;
  text-align: center;
}

.drawer-element {
  padding: 10px 0;
  width: 100%;
}
`
export const StyledTypeSelector = styled.div`
width: 800px;
margin: 0 auto;
display: grid;
grid-template-columns: 1fr auto 1fr;
grid-template-areas:
"text arrow matchBtn"
"dropdown null null";

.box-arrow-down-container {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  grid-area: arrow;
  border-left: 1px solid black;
  border-right: 1px solid black; 

  p {
    color: black;
  }
}
`