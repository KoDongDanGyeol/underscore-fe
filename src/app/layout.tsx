import RecoilProvider from "@/components/config/RecoilProvider"
import "@/styles/reset.css"

interface RootLayoutProps extends React.PropsWithChildren {
  //
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <RecoilProvider flag={false}>{children}</RecoilProvider>
      </body>
    </html>
  )
}

export default RootLayout
