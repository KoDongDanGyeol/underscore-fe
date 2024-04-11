import { useRef } from "react"
import { useRecoilState } from "recoil"
import { atomMap } from "@/stores/map"

const useMap = () => {
  const mapRef = useRef<any | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useRecoilState(atomMap)

  const handleDragend = () => {
    const bounds = mapRef.current.getBounds().toString()
    const convert = bounds.match(/([\d.]+)/g).map(parseFloat) as [number, number, number, number]
    setMap((prev) => ({ ...prev, bounds: [...convert] }))
  }

  const onInit = ({
    coordinates,
    callback,
  }: {
    coordinates?: { latitude: number; longitude: number }
    callback?: () => void
  }) => {
    if (map.isInitialized) return
    if (!containerRef.current) return
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

  const onDragend = () => {
    if (mapRef.current) window.kakao.maps.event.addListener(mapRef.current, "dragend", handleDragend)
  }

  const onRemove = () => {
    setMap((prev) => ({ ...prev, isInitialized: false, bounds: [0, 0, 0, 0] }))
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
