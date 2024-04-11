"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import SearchMap, { SearchMapTypes } from "@/components/form/SearchMap"
import Button from "@/components/general/Button"

export interface MapPanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const MapPanelHeader = (props: MapPanelHeaderProps) => {
  const { className = "", ...restProps } = props

  const pathname = usePathname()

  const searchMap = useForm<SearchMapTypes>({
    defaultValues: {
      keyword: "",
    },
  })

  return (
    <MapPanelHeaderContainer className={`${className}`} {...restProps}>
      <SearchMap
        formData={searchMap}
        formAction={{
          submit: "검색",
        }}
        formPlaceholder={{
          keyword: "행정동 검색",
        }}
        handleValid={(data) => console.log(data)}
      />
      <MapPanelHeaderNavigation>
        <ol>
          <li>
            <Link href="/map" passHref={true} legacyBehavior={true}>
              <Button type="button" asTag="a" isActive={/\/map(?!\/).*/.test(pathname)}>
                주변정보
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/map/report-analysis" passHref={true} legacyBehavior={true}>
              <Button type="button" asTag="a" isActive={/\/map\/report-analysis(?!\/).*/.test(pathname)}>
                상권분석
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/map/myplace" passHref={true} legacyBehavior={true}>
              <Button type="button" asTag="a" isActive={/\/map\/myplace(?!\/).*/.test(pathname)}>
                내장소
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/map/compare-analysis" passHref={true} legacyBehavior={true}>
              <Button type="button" asTag="a" isActive={/\/map\/compare-analysis(?!\/).*/.test(pathname)}>
                비교하기
              </Button>
            </Link>
          </li>
        </ol>
      </MapPanelHeaderNavigation>
    </MapPanelHeaderContainer>
  )
}

const MapPanelHeaderNavigation = styled.nav`
  margin-top: 12px;
  ol {
    display: flex;
    gap: 8px;
  }
  li {
    flex: 1 1 0px;
  }
  a {
    width: 100%;
  }
`

const MapPanelHeaderContainer = styled.div`
  /*  */
`

export default MapPanelHeader
