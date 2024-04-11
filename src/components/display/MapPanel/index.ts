import MapPanelMain, { MapPanelMainProps } from "@/components/display/MapPanel/Main"
import MapPanelHeader, { MapPanelHeaderProps } from "@/components/display/MapPanel/Header"

export type { MapPanelMainProps, MapPanelHeaderProps }

export default Object.assign(MapPanelMain, {
  Header: MapPanelHeader,
})
