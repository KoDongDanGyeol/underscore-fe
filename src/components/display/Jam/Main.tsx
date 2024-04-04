"use client"

import { useState } from "react"
import useMount from "@/libs/hook/useMount"

export interface JamMainProps extends React.HTMLAttributes<HTMLDivElement> {
  delay: number
}

const JamMain = (props: JamMainProps) => {
  const { delay = 500, className = "", ...restProps } = props

  const [jamStructure, setJamStructure] = useState({
    isReady: false,
  })

  const {
    mountStructure: { isMounted },
  } = useMount(() => {
    setTimeout(() => setJamStructure((prev) => ({ ...prev, isReady: true })), delay)
  }, [])

  const jamError = () => {
    throw new Error("Error!")
  }

  if (!isMounted) return null
  if (!jamStructure.isReady) return null

  return <div className={`${className} ${jamError()}`} {...restProps} />
}

export default JamMain
