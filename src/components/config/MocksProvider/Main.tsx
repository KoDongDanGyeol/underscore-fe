"use client"

import { useState } from "react"
import useMount from "@/libs/hook/useMount"

export interface MocksProviderMainProps extends React.PropsWithChildren {
  //
}

interface TypeStructure {
  isEnabled: boolean
  isReady: boolean
}

const MocksProviderMain = (props: MocksProviderMainProps) => {
  const { children } = props

  const [structure, setStructure] = useState<TypeStructure>({
    isEnabled: process.env.NEXT_PUBLIC_API_MOCKING_STATUS === "enabled",
    isReady: false,
  })

  const {
    mountStructure: { isMounted },
  } = useMount(() => {
    if (!structure.isEnabled) return
    if (structure.isReady) return
    ;(async () => {
      const initMocks = (await import("@/mocks/index")).default
      await initMocks()
      setStructure((prev) => ({ ...prev, isReady: true }))
    })()
  }, [])

  if (structure.isEnabled && !isMounted) return <div>setup mocks...</div>
  if (structure.isEnabled && !structure.isReady) return <div>setup mocks...</div>

  return <>{children}</>
}

export default MocksProviderMain
