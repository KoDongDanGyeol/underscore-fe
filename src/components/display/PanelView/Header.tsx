"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import useMap from "@/libs/hook/useMap"
import useOnScreen from "@/libs/hook/useOnScreen"
import useSearchLocation, { TypeSearchLocationResult } from "@/queries/api/map/useSearchLocation"
import { Timer, clearTimer, setTimer } from "@/libs/timer"
import SearchLocation, { TypeSearchLocation } from "@/components/form/SearchLocation"

export interface PanelViewHeaderProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  kakaoRef: React.MutableRefObject<any | null>
}

const PanelViewHeader = (props: PanelViewHeaderProps) => {
  const { kakaoRef, className = "", children, ...restProps } = props

  const timers = useRef<Timer>({ delay: null })
  const [structure, setStructure] = useState({
    location: "",
    isUpdated: false,
    isExpand: false,
  })

  const {
    mapStructure: { mode },
    onMove,
  } = useMap()

  const { flatData, hasNextPage, fetchNextPage } = useSearchLocation({
    location: structure.location,
  })

  const {
    onScreenRefs: { infiniteRef },
    onScreenStructure: { isVisible },
  } = useOnScreen()

  const searchLocation = useForm<TypeSearchLocation>({
    defaultValues: {
      location: structure.location,
    },
  })

  const onSelect = async (data: TypeSearchLocationResult["documents"][number]) => {
    searchLocation.setValue("location", data.address_name)
    onMove(kakaoRef, { coordinates: { latitude: +data.y, longitude: +data.x } })
    setStructure((prev) => ({ ...prev, location: data.address_name, isUpdated: false, isExpand: false }))
  }

  const onSubmit = async (data: TypeSearchLocation) => {
    if (!data?.location) setStructure((prev) => ({ ...prev, location: "", isUpdated: false, isExpand: false }))
    else setStructure((prev) => ({ ...prev, location: data?.location ?? "", isUpdated: true, isExpand: true }))
  }

  useEffect(() => {
    if (isVisible && hasNextPage) fetchNextPage()
  }, [isVisible, hasNextPage])

  useEffect(() => {
    if (!structure.isUpdated) return
    ;(async () => {
      clearTimer(timers, { key: "delay" })
      await setTimer(timers, { key: "delay", delay: 50 })
      setStructure((prev) => ({ ...prev, isUpdated: false }))
    })()
  }, [structure.isUpdated])

  return (
    <PanelViewHeaderContainer className={`${className}`} {...restProps}>
      <SearchLocation
        formData={searchLocation}
        formAction={{
          submit: "검색",
        }}
        formPlaceholder={{
          location: "행정동 검색",
        }}
        isUpdated={structure.isUpdated}
        handleValid={onSubmit}
      >
        {mode === "Advanced" && structure.isExpand && Boolean(flatData.length) && (
          <Fragment>
            <ul role="listbox" id="location-listbox" tabIndex={0}>
              {flatData.map((data) => (
                <li role="none" key={`[${data.x}, ${data.y}]`}>
                  <SearchLocation.Option data={data} onClick={() => onSelect(data)} />
                </li>
              ))}
            </ul>
          </Fragment>
        )}
        <div key="infiniteRef" id="infiniteRef" ref={infiniteRef} />
      </SearchLocation>
      {children}
    </PanelViewHeaderContainer>
  )
}

const PanelViewHeaderContainer = styled.div`
  /*  */
`

export default PanelViewHeader
