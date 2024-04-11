"use client"

import styled, { css } from "styled-components"
import useMount from "@/libs/hook/useMount"
import useMap from "@/libs/hook/useMap"
import useGeolocation from "@/libs/hook/useGeolocation"
import Icon from "@/components/general/Icon"
import Button from "@/components/general/Button"

export interface MapViewMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const fallbackCoordinates = {
  latitude: 37.566585446882,
  longitude: 126.978203640984,
}

const MapViewMain = (props: MapViewMainProps) => {
  const { className = "", ...restProps } = props

  const {
    geolocationStructure: { isLoaded, coordinates },
    onOverwrite,
  } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1,
    maximumAge: 1000 * 3600 * 24,
  })

  const {
    mapRefs: { containerRef },
    mapStructure: { isInitialized, bounds },
    onInit,
    onDragend,
    onRemove,
  } = useMap(coordinates ?? fallbackCoordinates, () => {
    onDragend()
  })

  const {
    mountStructure: { isMounted },
  } = useMount(() => {
    if (isLoaded && isMounted) onInit()
    return () => {
      onRemove()
    }
  }, [isLoaded])

  if (!isMounted) {
    return (
      <MapViewMainContainer className={`${className}`} $isPending={true} {...restProps}>
        <Icon name="Loading" aria-hidden={true} />
        <strong>로딩중이에요</strong>
      </MapViewMainContainer>
    )
  }

  if (!isLoaded) {
    return (
      <MapViewMainContainer className={`${className}`} $isPending={true} {...restProps}>
        <Icon name="Loading" aria-hidden={true} />
        <strong>위치정보 권한을 확인해주세요</strong>
        <Button type="button" shape="plain" variants="primary" onClick={() => onOverwrite(fallbackCoordinates)}>
          권한없이 시작하기
        </Button>
      </MapViewMainContainer>
    )
  }

  return (
    <MapViewMainContainer className={`${className}`} $isPending={isInitialized} {...restProps}>
      <div id="map" ref={containerRef} />
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
