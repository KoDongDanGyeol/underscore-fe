"use client"

import styled, { css } from "styled-components"

export interface MapViewMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  isPending: boolean
}

const MapViewMain = (props: MapViewMainProps) => {
  const { isPending, className = "", children, ...restProps } = props

  return (
    <MapViewMainContainer className={`${className}`} $isPending={isPending} {...restProps}>
      {children}
    </MapViewMainContainer>
  )
}

interface MapViewMainStyled {
  $isPending: boolean
}

const MapViewMainContainer = styled.div<MapViewMainStyled>`
  position: relative;
  flex: 1 1 0px;
  #map {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  ${(props) =>
    props.$isPending &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 24px;
        color: rgb(var(--color-primary600));
      }
      strong {
        margin-top: 8px;
      }
    `}
`

export default MapViewMain
