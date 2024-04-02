import { useEffect, useMemo, useState } from "react"

type Callback = () => undefined | void | (() => void)
type Dependencies = readonly unknown[]

const useMount = (callback?: Callback, deps?: Dependencies) => {
  const [structure, setStructure] = useState<{
    isMounted: boolean
  }>({
    isMounted: false,
  })

  const dependencies = useMemo(() => deps ?? [], [deps])

  useEffect(() => {
    setStructure((prev) => ({
      ...prev,
      isMounted: true,
    }))
  }, [])

  useEffect(() => {
    if (!structure.isMounted) return
    if (!callback) return
    const cleanup = callback?.()
    return () => {
      cleanup?.()
    }
  }, [structure.isMounted, callback, dependencies])

  return {
    mountStructure: structure,
  }
}

export default useMount
