"use client"

import styled from "styled-components"
import Layout from "@/components/display/Layout"
import Copyright from "@/components/navigation/Copyright"

interface PageLayoutProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  //
}

const PageLayout = (props: PageLayoutProps) => {
  const { className = "", children } = props

  return (
    <Layout className={`${className}`}>
      <Layout.Header />
      <Layout.Navigation />
      <Layout.Content>
        {children}
        <PageLayoutFooter>
          <Copyright />
        </PageLayoutFooter>
      </Layout.Content>
    </Layout>
  )
}

const PageLayoutFooter = styled.footer`
  /*  */
`

export default PageLayout
