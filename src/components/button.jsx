import React from 'react'
import styled from 'styled-components'

const NavBtn = styled.div`
width: 300px;
font-size: 18px;
border: 1px solid red;
text-align: center;
`

const SmallBtn = styled.div`
text-align: center;
`

const MediumBtn = styled.div`
text-align: center;
`

const LargeBtn = styled.div`
text-align: center;
`

export default (props) => {
  switch (props.size) {
    case 'nav':
    return(
      <NavBtn>
        <p>{props.text}</p>
      </NavBtn>
    )

    case 'small':
    return(
      <SmallBtn>
        <p>{props.text}</p>
      </SmallBtn>
    )

    case 'meduim':
    return(
      <MediumBtn>
        <p>{this.props.text}</p>
      </MediumBtn>
    )

    case 'large':
    return(
      <LargeBtn>
        <p>{this.props.text}</p>
      </LargeBtn>
    )

    default:
    return(
      <MediumBtn>
        <p>{props.text}</p>
      </MediumBtn>
    )
  }
}
