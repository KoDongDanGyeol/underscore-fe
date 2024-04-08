"use client"

import Link from "next/link"
import styled from "styled-components"
import MapView from "@/components/display/MapView"
import MapPanel from "@/components/display/MapPanel"
import Copyright from "@/components/navigation/Copyright"

interface PageLayoutProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  tab: React.ReactNode
}

const PageLayout = (props: PageLayoutProps) => {
  const { tab, children } = props

  return (
    <>
      <MapPanel>
        <nav>
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
        </nav>
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

const PageLayoutFooter = styled.footer`
  /*  */
`

export default PageLayout
