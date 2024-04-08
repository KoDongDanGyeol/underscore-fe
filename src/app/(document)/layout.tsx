"use client"

import styled from "styled-components"
import Layout from "@/components/display/Layout"
import Copyright from "@/components/navigation/Copyright"

interface PageLayoutProps extends React.PropsWithChildren {
  //
}

const PageLayout = (props: PageLayoutProps) => {
  const { children } = props

  return (
    <Layout>
      <Layout.Header />
      <Layout.Navigation />
      <Layout.Content>{children}</Layout.Content>
      <PageLayoutFooter>
        <Copyright />
      </PageLayoutFooter>
    </Layout>
  )
}

const PageLayoutFooter = styled.footer`
  /*  */
`

export default PageLayout
