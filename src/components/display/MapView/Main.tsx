"use client"

import styled from "styled-components"

export interface MapViewMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const MapViewMain = (props: MapViewMainProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <MapViewMainContainer className={`${className}`} {...restProps} style={{}}>
      {children}
    </MapViewMainContainer>
  )
}

const MapViewMainContainer = styled.div`
  flex: 1 1 0px;
  border: 1px solid orange;
`

export default MapViewMain
