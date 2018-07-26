import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.div`
box-sizing: border-box;
height: 200px;
position: relative;
background-color: #6534FF;
padding: 40px 50px;
a, p {
  text-decoration: none;
  color: white;
  font-family: Liberation Sans;
}

p {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.links-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
`

export default () => {
  return(
    <StyledFooter>
      <div className="links-container">
        <a href="#" className="footer-link">Github</a>
        <a href="#" className="footer-link">Signup</a>
        <a href="#" className="footer-link">Login</a>
      </div>
      <p id="footer-stamp">Designed and developed by Paul Asetre</p>
    </StyledFooter>
  )
}