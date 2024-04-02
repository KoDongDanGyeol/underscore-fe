"use client"

import { useState } from "react"
import { useServerInsertedHTML } from "next/navigation"
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components"
import useMount from "@/libs/hook/useMount"
import { theme } from "@/styles/theme"
import Global from "@/styles/global"

export interface StyledProviderMainProps extends React.PropsWithChildren {
  //
}

const StyledProviderMain = (props: StyledProviderMainProps) => {
  const { children, ...restProps } = props

  const {
    mountStructure: { isMounted },
  } = useMount()
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (isMounted)
    return (
      <ThemeProvider theme={theme} {...restProps}>
        {children}
      </ThemeProvider>
    )

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme} {...restProps}>
        <Global />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  )
}

export default StyledProviderMain
