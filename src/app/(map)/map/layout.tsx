"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import styled from "styled-components"
import useMount from "@/libs/hook/useMount"
import useMap from "@/libs/hook/useMap"
import useGeolocation from "@/libs/hook/useGeolocation"
import MapView from "@/components/display/MapView"
import PanelView from "@/components/display/PanelView"
import Icon from "@/components/general/Icon"
import Button from "@/components/general/Button"
import Copyright from "@/components/navigation/Copyright"

interface PageLayoutProps extends React.PropsWithChildren {
  tab: React.ReactNode
}

const fallbackCoordinates = {
  latitude: 37.566585446882,
  longitude: 126.978203640984,
}

const PageLayout = (props: PageLayoutProps) => {
  const { tab, children } = props

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const {
    geolocationStructure: { isLoaded, coordinates },
    onOverwrite,
  } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1,
    maximumAge: 1000 * 3600 * 24,
  })

  const {
    mapRefs: { containerRef, kakaoRef },
    mapStructure: { isInitialized, level, center },
    onInit,
    onDragend,
    onZoomChanged,
    onRemove,
  } = useMap()

  const {
    mountStructure: { isMounted },
  } = useMount(() => {
    const { level, latitude, longitude } = getSearchParams()
    const center = latitude && longitude ? { latitude, longitude } : null
    if (isLoaded && isMounted)
      onInit({
        level: level ?? 3,
        coordinates: center ?? coordinates ?? fallbackCoordinates,
      })
    return () => {
      onRemove(kakaoRef)
    }
  }, [isLoaded, coordinates])

  const getSearchParams = () => {
    const params = Object.fromEntries(Array.from(searchParams.entries()))
    const level = /^\d+$/.test(params.level ?? "") ? parseFloat(params.level ?? "") : null
    const latitude = /^(\d+(.)?\d+)$/.test(params.latitude ?? "") ? parseFloat(params.latitude ?? "") : null
    const longitude = /^(\d+(.)?\d+)$/.test(params.longitude ?? "") ? parseFloat(params.longitude ?? "") : null
    return { level, latitude, longitude }
  }

  useEffect(() => {
    if (!isInitialized) return
    onDragend(kakaoRef)
    onZoomChanged(kakaoRef)
  }, [isInitialized])

  useEffect(() => {
    router.replace(
      `${pathname}?level=${JSON.stringify(level)}&latitude=${JSON.stringify(center[0])}&longitude=${JSON.stringify(center[1])}`,
    )
  }, [level, center])

  return (
    <>
      <PanelView>
        <PanelViewHeader kakaoRef={kakaoRef}>
          <PanelView.Navigation />
        </PanelViewHeader>
        <PanelViewTab>
          {tab}
          {children}
          <PanelViewFooter>
            <Copyright />
          </PanelViewFooter>
        </PanelViewTab>
      </PanelView>
      {!isMounted ? (
        <MapView isPending={true}>
          <Icon name="Loading" aria-hidden={true} />
          <strong>로딩중이에요</strong>
        </MapView>
      ) : !isLoaded ? (
        <MapView isPending={true}>
          <Icon name="Loading" aria-hidden={true} />
          <strong>위치정보 권한을 확인해주세요</strong>
          <Button type="button" shape="plain" variants="primary" onClick={() => onOverwrite(fallbackCoordinates)}>
            권한없이 시작하기
          </Button>
        </MapView>
      ) : (
        <MapView isPending={isInitialized}>
          <div ref={containerRef} id="map" />
        </MapView>
      )}
    </>
  )
}

const PanelViewHeader = styled(PanelView.Header)`
  padding: 18px 20px 14px 20px;
  background: rgb(var(--color-primary600));
  @media ${(props) => props.theme.screen.device.md} {
    padding: 0 20px 14px;
  }
`

const PanelViewTab = styled.div`
  flex: 1 1 0px;
  background: rgb(var(--color-neutral300));
  overflow: auto;
`

const PanelViewFooter = styled.div`
  padding: 24px 20px;
`

export default PageLayout
