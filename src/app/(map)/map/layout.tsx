"use client"

import Link from "next/link"
import styled from "styled-components"
import MapView from "@/components/display/MapView"
import MapPanel from "@/components/display/MapPanel"
import Copyright from "@/components/navigation/Copyright"

interface PageLayoutProps extends React.PropsWithChildren {
  tab: React.ReactNode
}

const PageLayout = (props: PageLayoutProps) => {
  const { tab, children } = props

  return (
    <>
      <MapPanel>
        <PageLayoutTab>
          <ol>
            <li>
              <Link href="/map">주변정보</Link>
            </li>
            <li>
              <Link href="/map/report-analysis">상권분석</Link>
            </li>
            <li>
              <Link href="/map/myplace">내장소</Link>
            </li>
            <li>
              <Link href="/map/compare-analysis">비교하기</Link>
            </li>
          </ol>
        </PageLayoutTab>
        {tab}
        {children}
        <PageLayoutFooter>
          <Copyright />
        </PageLayoutFooter>
      </MapPanel>
      <MapView />
    </>
  )
}

const PageLayoutTab = styled.nav`
  ol {
    display: flex;
  }
`

const PageLayoutFooter = styled.div`
  /*  */
`

export default PageLayout
