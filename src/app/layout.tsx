import type { Metadata } from "next"
import { PublicEnvScript } from "next-runtime-env"
import RecoilProvider from "@/components/config/RecoilProvider"
import StyledProvider from "@/components/config/StyledProvider"
import notoSansKr from "@/styles/font/notoSansKr"
import "@/styles/reset.css"

export const metadata: Metadata = {
  title: {
    default: "Underscore",
    template: "%s | Underscore",
  },
  description: "Underscore",
  keywords: "Underscore",
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps extends React.PropsWithChildren {
  //
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang="ko" className={notoSansKr.variable} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <PublicEnvScript />
      </head>
      <body>
        <RecoilProvider flag={false}>
          <StyledProvider>{children}</StyledProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}

export default RootLayout
