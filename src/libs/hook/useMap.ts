import { useRef } from "react"
import { useRecoilState } from "recoil"
import { atomMap } from "@/stores/map"

const KAKAO_SDK_URL = `${process.env.NEXT_PUBLIC_API_KAKAO_URL}/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KAKAO_JS_KEY}&autoload=false&libraries=services&clusterer`

type Ref = React.MutableRefObject<any | null>
type Level = number
type Coordinates = { latitude: number; longitude: number }

const useMap = () => {
  const [map, setMap] = useRecoilState(atomMap)

  const kakaoRef = useRef<any | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const setupRef = useRef<{ level: Level; coordinates: Coordinates }>({
    level: 3,
    coordinates: { latitude: 0, longitude: 0 },
  })

  const handleLoad = () => {
    window.kakao.maps.load(() => {
      const { level, coordinates } = setupRef.current
      const options = { center: new window.kakao.maps.LatLng(coordinates.latitude, coordinates.longitude), level }
      const kakaoMap = new window.kakao.maps.Map(containerRef.current, options)
      kakaoRef.current = kakaoMap
      const center = kakaoRef.current.getCenter().toString()
      const bounds = kakaoRef.current.getBounds().toString()
      setMap((prev) => ({
        ...prev,
        center: center.match(/(\d+(.)?\d+)/g).map(parseFloat) as [number, number],
        bounds: bounds.match(/(\d+(.)?\d+)/g).map(parseFloat) as [number, number, number, number],
        isInitialized: true,
      }))
    })
  }

  const handleChanged = () => {
    const level = kakaoRef.current.getLevel()
    const center = kakaoRef.current.getCenter().toString()
    const bounds = kakaoRef.current.getBounds().toString()
    setMap((prev) => ({
      ...prev,
      level: level,
      center: center.match(/(\d+(.)?\d+)/g).map(parseFloat) as [number, number],
      bounds: bounds.match(/(\d+(.)?\d+)/g).map(parseFloat) as [number, number, number, number],
    }))
  }

  const onInit = ({ level, coordinates }: { level: Level; coordinates: Coordinates }) => {
    if (map.isInitialized) return
    if (!containerRef.current) return
    setupRef.current = { level, coordinates }
    scriptRef.current = document.createElement("script")
    scriptRef.current.async = true
    scriptRef.current.src = KAKAO_SDK_URL
    scriptRef.current.setAttribute("strategy", "beforeInteractive")
    document.head.appendChild(scriptRef.current)
    scriptRef.current.addEventListener("load", handleLoad)
  }

  const onDragend = (ref: Ref) => {
    kakaoRef.current = ref.current
    window.kakao.maps.event.addListener(kakaoRef.current, "dragend", handleChanged)
  }

  const onZoomChanged = (ref: Ref) => {
    kakaoRef.current = ref.current
    window.kakao.maps.event.addListener(kakaoRef.current, "zoom_changed", handleChanged)
  }

  const onMove = (ref: Ref, { coordinates }: { coordinates: Coordinates }) => {
    kakaoRef.current = ref.current
    const moveLatLon = new window.kakao.maps.LatLng(coordinates.latitude, coordinates.longitude)
    kakaoRef.current.relayout()
    kakaoRef.current.setLevel(3)
    kakaoRef.current.setCenter(moveLatLon)
    handleChanged()
  }

  const onRemove = (ref: Ref) => {
    kakaoRef.current = ref.current
    setMap((prev) => ({ ...prev, isInitialized: false, bounds: [0, 0, 0, 0] }))
    if (scriptRef.current) scriptRef.current.removeEventListener("load", handleLoad)
    if (kakaoRef.current) window.kakao.maps.event.removeListener(kakaoRef.current, "dragend", handleChanged)
    if (kakaoRef.current) window.kakao.maps.event.removeListener(kakaoRef.current, "zoom_changed", handleChanged)
  }

  return {
    mapStructure: map,
    mapRefs: {
      containerRef,
      kakaoRef,
    },
    onInit,
    onDragend,
    onMove,
    onZoomChanged,
    onRemove,
  }
}

export default useMap
