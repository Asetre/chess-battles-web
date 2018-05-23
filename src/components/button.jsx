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
border: 1px solid green;
width: 400px;
font-size: 20px;
padding: 10px 0;
`

const LargeBtn = styled.div`
text-align: center;
border: 1px solid blue;
`

export default (props) => {
  switch (props.size) {
    case 'nav':
    return(
      <NavBtn onClick={props.onClick}>
        <p>{props.text}</p>
      </NavBtn>
    )

    case 'small':
    return(
      <SmallBtn>
        <p>{props.text}</p>
      </SmallBtn>
    )

    case 'medium':
    return(
      <MediumBtn onClick={props.onClick}>
        <p>{props.text}</p>
      </MediumBtn>
    )

    case 'large':
    return(
      <LargeBtn>
        <p>{props.text}</p>
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
