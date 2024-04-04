"use client"

import { useState } from "react"
import useMount from "@/libs/hook/useMount"

export interface MocksProviderMainProps extends React.PropsWithChildren {
  //
}

const MocksProviderMain = (props: MocksProviderMainProps) => {
  const { children } = props

  const [mocksStructure, setMocksStructure] = useState({
    isEnabled: process.env.NEXT_PUBLIC_API_MOCKING_STATUS === "enabled",
    isReady: false,
  })

  const {
    mountStructure: { isMounted },
  } = useMount(() => {
    if (!mocksStructure.isEnabled) return
    if (mocksStructure.isReady) return
    ;(async () => {
      const initMocks = (await import("@/mocks/index")).default
      await initMocks()
      setMocksStructure((prev) => ({ ...prev, isReady: true }))
    })()
  })

  if (mocksStructure.isEnabled && !isMounted) return <div>setup mocks...</div>
  if (mocksStructure.isEnabled && !mocksStructure.isReady) return <div>setup mocks...</div>

  return <>{children}</>
}

export default MocksProviderMain
