import React from 'react'
import styled from 'styled-components'

const Loader = styled.div`
  animation: round 3s ease infinite;
  display: flex;
  align-items: center;
  font-size: 18px;
  opacity: 0.8;
  justify-content: center;
`
const LoaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const TextLoading = styled.div`
  margin-left: 5px;
  font-size: 12px;
  opacity: 0.8;
`

export default function Loading(props) {
  const {children, color = '#333', text = null, size = 18, ...rest} = props
  return (
    <LoaderBox {...rest}>
      <Loader style={{color, fontSize: size}} className="ico-loader">
        {children}
      </Loader>
      {text && <TextLoading>{text}</TextLoading>}
    </LoaderBox>
  )
}
