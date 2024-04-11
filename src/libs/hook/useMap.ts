import { useRef } from "react"
import { useRecoilState } from "recoil"
import { atomMap } from "@/stores/map"

type Coordinates = { latitude: number; longitude: number }
type Callback = () => void

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KAKAO_MAP_KEY}&autoload=false&libraries=services&clusterer`

const useMap = (coordinates?: Coordinates, callback?: Callback) => {
  const mapRef = useRef<any | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useRecoilState(atomMap)

  const handleLoad = () => {
    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(coordinates?.latitude, coordinates?.longitude)
      const options = { center, level: 3 }
      const map = new window.kakao.maps.Map(containerRef.current, options)
      mapRef.current = map
      const bounds = mapRef.current.getBounds().toString()
      const convert = bounds.match(/([\d.]+)/g).map(parseFloat) as [number, number, number, number]
      setMap((prev) => ({ ...prev, isInitialized: true, bounds: [...convert] }))
      callback?.()
    })
  }

  const handleDragend = () => {
    const bounds = mapRef.current.getBounds().toString()
    const convert = bounds.match(/([\d.]+)/g).map(parseFloat) as [number, number, number, number]
    setMap((prev) => ({ ...prev, bounds: [...convert] }))
  }

  const onInit = () => {
    if (map.isInitialized) return
    if (!containerRef.current) return
    scriptRef.current = document.createElement("script")
    scriptRef.current.async = true
    scriptRef.current.src = KAKAO_SDK_URL
    scriptRef.current.setAttribute("strategy", "beforeInteractive")
    document.head.appendChild(scriptRef.current)
    scriptRef.current.addEventListener("load", handleLoad)
  }

  const onDragend = () => {
    if (mapRef.current) window.kakao.maps.event.addListener(mapRef.current, "dragend", handleDragend)
  }

  const onRemove = () => {
    setMap((prev) => ({ ...prev, isInitialized: false, bounds: [0, 0, 0, 0] }))
    if (scriptRef.current) scriptRef.current.removeEventListener("load", handleLoad)
    if (mapRef.current) window.kakao.maps.event.removeListener(mapRef.current, "dragend", handleDragend)
  }

  return {
    mapStructure: map,
    mapRefs: {
      mapRef,
      containerRef,
    },
    onInit,
    onDragend,
    onRemove,
  }
}

export default useMap
