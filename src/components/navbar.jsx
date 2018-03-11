import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const StyledNavbar = styled.div`
    color: red;
    font-size: 200%;
`

const Logo = styled.a`
`

const Button = styled.button`
    width: 145px;
    height: 30px;
`

var Navbar = props => {
    const handleLogin = () => {
        console.log('login')
    }

    const handleSignup = () => {
        console.log('signup')
    }

    return(
        <StyledNavbar>
            <Logo>
                Chess Battles
            </Logo>

            <Button onClick={handleSignup}>Signup</Button>
            <Button onClick={handleLogin}>Login</Button>
        </StyledNavbar>
    )
}

var stateToProps = state => {
    return {}
}

var dispatchToProps = dispatch => {
    return {}
}

export default connect(stateToProps, dispatchToProps)(Navbar)
