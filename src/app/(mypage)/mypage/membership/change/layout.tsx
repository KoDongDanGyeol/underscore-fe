"use client"

interface PageLayoutProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  join: React.ReactNode
  leave: React.ReactNode
}

const PageLayout = (props: PageLayoutProps) => {
  const { join, leave, children } = props

  const isMember = false

  return (
    <>
      {isMember ? leave : join}
      {children}
    </>
  )
}

export default PageLayout
