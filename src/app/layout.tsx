import type { Metadata } from "next"
import Script from "next/script"
import { PublicEnvScript } from "next-runtime-env"
import RecoilProvider from "@/components/config/RecoilProvider"
import StyledProvider from "@/components/config/StyledProvider"
import QueryProvider from "@/components/config/QueryProvider"
import MocksProvider from "@/components/config/MocksProvider"
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <PublicEnvScript />
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      </head>
      <body>
        <RecoilProvider flag={false}>
          <StyledProvider>
            <QueryProvider>
              <MocksProvider>{children}</MocksProvider>
            </QueryProvider>
          </StyledProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}

export default RootLayout
