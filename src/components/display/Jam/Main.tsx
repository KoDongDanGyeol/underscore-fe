"use client"

import { useState } from "react"
import useMount from "@/libs/hook/useMount"

export interface JamMainProps extends React.HTMLAttributes<HTMLDivElement> {
  delay: number
}

const JamMain = (props: JamMainProps) => {
  const { delay = 500, className = "", ...restProps } = props

  const [isVisible, setIsVisible] = useState(false)

  const { mountStructure } = useMount(() => {
    ;(async () => {
      setTimeout(() => {
        setIsVisible(() => true)
      }, delay)
    })()
  }, [])

  const jamError = () => {
    throw new Error("Error!")
  }

  if (!mountStructure.isMounted) return null
  if (!isVisible) return null

  return <div className={`${className} ${jamError()}`} {...restProps} />
}

export default JamMain
