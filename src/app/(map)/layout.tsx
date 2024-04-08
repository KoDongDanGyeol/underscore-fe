"use client"

import styled from "styled-components"
import Layout from "@/components/display/Layout"

interface PageLayoutProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  //
}

const PageLayout = (props: PageLayoutProps) => {
  const { className = "", children } = props

  return (
    <Layout className={`${className}`}>
      <Layout.Header />
      <Layout.Navigation />
      <PageLayoutContent>{children}</PageLayoutContent>
    </Layout>
  )
}

const PageLayoutContent = styled(Layout.Content)`
  display: flex;
`

const PageLayoutFooter = styled.footer`
  /*  */
`

export default PageLayout
