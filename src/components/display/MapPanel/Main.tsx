"use client"

import styled from "styled-components"

export interface MapPanelMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const MapPanelMain = (props: MapPanelMainProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <MapPanelMainContainer className={`${className}`} {...restProps} style={{}}>
      {children}
    </MapPanelMainContainer>
  )
}

const MapPanelMainContainer = styled.div`
  flex: none;
  width: 35%;
  min-width: 240px;
  max-width: 386px;
  border: 1px solid blue;
  @media ${(props) => props.theme.screen.device.md} {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-width: inherit;
    max-width: inherit;
    height: 130px;
    overflow: hidden;
  }
`

export default MapPanelMain
