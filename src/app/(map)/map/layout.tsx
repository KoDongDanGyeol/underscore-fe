"use client"

import MapView from "@/components/display/MapView"
import MapPanel from "@/components/display/MapPanel"

interface PageLayoutProps extends React.PropsWithChildren {
  tab: React.ReactNode
}

const PageLayout = (props: PageLayoutProps) => {
  const { tab, children } = props

  return (
    <>
      <MapPanel>
        {tab}
        {children}
      </MapPanel>
      <MapView />
    </>
  )
}

export default PageLayout
