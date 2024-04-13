import PanelViewMain, { PanelViewMainProps } from "@/components/display/PanelView/Main"
import PanelViewHeader, { PanelViewHeaderProps } from "@/components/display/PanelView/Header"
import PanelViewNavigation, { PanelViewNavigationProps } from "@/components/display/PanelView/Navigation"

export type { PanelViewMainProps, PanelViewHeaderProps, PanelViewNavigationProps }

export default Object.assign(PanelViewMain, {
  Header: PanelViewHeader,
  Navigation: PanelViewNavigation,
})
