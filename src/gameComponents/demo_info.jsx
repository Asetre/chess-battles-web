import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
`

const ClassInfo = styled.div`
`

const Vs = styled.h2`
`

export default () => {
  return(
    <Container>
      <ClassInfo>
        <div>
        </div>
          <div className="text">
        </div>
      </ClassInfo>

        <Vs>VS</Vs>

        <ClassInfo>
        <div>
          </div>
          <div className="text">
        </div>
      </ClassInfo>
    </Container>
  )
}
