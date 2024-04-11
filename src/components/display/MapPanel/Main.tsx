"use client"

import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled, { css } from "styled-components"
import useMount from "@/libs/hook/useMount"
import useTouch from "@/libs/hook/useTouch"
import { atomGlobal } from "@/stores/global"
import MapPanelHeader from "@/components/display/MapPanel/Header"
import Copyright from "@/components/navigation/Copyright"

export interface MapPanelMainProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const MapPanelMain = (props: MapPanelMainProps) => {
  const { className = "", children, ...restProps } = props

  const global = useRecoilValue(atomGlobal)
  const [structure, setStructure] = useState({
    isOpened: false,
  })

  const {
    touchRefs: { containerRef, contentRef },
    onInit,
    onRemove,
  } = useTouch({
    updateTouch: ({ currentState }) => {
      if (!containerRef.current) return
      if (currentState.moved.directionY === 0) {
        containerRef.current.style.removeProperty("transition")
        containerRef.current.style.removeProperty("transform")
      } else {
        const translateY = `calc(${structure.isOpened ? "-100vh + 48px + 20px" : "0px - 120px"} + ${(currentState.moved.movedY || 0) / 3}px)`
        containerRef.current.style.setProperty("transition", "none")
        containerRef.current.style.setProperty("transform", `translateY(${translateY})`)
      }
    },
    afterTouch: ({ currentState }) => {
      if (currentState.moved.directionY === -1 && currentState.moved.movedY > 100) {
        setStructure((prev) => ({ ...prev, isOpened: false }))
      } else if (currentState.moved.directionY === 1 && currentState.moved.movedY < 100) {
        setStructure((prev) => ({ ...prev, isOpened: true }))
      }
    },
  })

  const {
    mountStructure: { isMounted },
  } = useMount(() => {
    onInit()
    return () => {
      onRemove()
    }
  }, [])

  useEffect(() => {
    setStructure((prev) => ({ ...prev, isOpened: false }))
  }, [global.screen])

  return (
    <MapPanelMainContainer
      ref={containerRef}
      tabIndex={0}
      className={`${className}`}
      $isOpened={structure.isOpened}
      {...restProps}
    >
      <MapPanelMainHandle />
      <MapPanelMainContent ref={contentRef}>
        <MapPanelMainHeader />
        <MapPanelMainTab>
          {children}
          <MapPanelMainFooter>
            <Copyright />
          </MapPanelMainFooter>
        </MapPanelMainTab>
      </MapPanelMainContent>
    </MapPanelMainContainer>
  )
}

interface MapPanelMainStyled {
  $isOpened: boolean
}

const MapPanelMainHandle = styled.span`
  display: none;
  @media ${(props) => props.theme.screen.device.md} {
    display: block;
    padding: 10px 0 16px;
    &:after {
      content: "";
      display: block;
      margin: auto;
      width: 36px;
      height: 4px;
      background: rgb(var(--color-neutral100));
      border-radius: 4px;
    }
  }
`

const MapPanelMainContent = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
`

const MapPanelMainHeader = styled(MapPanelHeader)`
  padding: 18px 20px 14px 20px;
  @media ${(props) => props.theme.screen.device.md} {
    padding: 0 20px 14px;
  }
`

const MapPanelMainTab = styled.div`
  flex: 1 1 0px;
  background: rgb(var(--color-neutral300));
  overflow: auto;
`

const MapPanelMainFooter = styled.div`
  padding: 24px 20px;
`

const MapPanelMainContainer = styled.div<MapPanelMainStyled>`
  flex: none;
  display: flex;
  flex-direction: column;
  width: 385px;
  background: rgb(var(--color-primary600));
  z-index: 9;
  @media ${(props) => props.theme.screen.device.md} {
    position: fixed;
    top: 100vh;
    left: 0;
    right: 0;
    bottom: calc(-100vh + 48px + 20px);
    width: auto;
    overflow: hidden;
    transform: translateY(calc(0px - 120px));
    transition: transform 200ms var(--motion-ease-out);
    border-radius: 8px 8px 0 0;
    ${(props) =>
      props.$isOpened &&
      css`
        transform: translateY(calc(-100vh + 48px + 20px));
      `}
  }
`

export default MapPanelMain
