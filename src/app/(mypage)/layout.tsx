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
      <PageLayoutContent>{children}</PageLayoutContent>
      <PageLayoutFooter>
        <Copyright />
      </PageLayoutFooter>
    </Layout>
  )
}

const PageLayoutContent = styled(Layout.Content)`
  padding: 48px 44px 0;
  background: rgb(var(--color-neutral300));
  .breadcrumb {
    padding: 16px 0;
  }
  .container {
    padding: 24px;
    background: rgb(var(--color-neutral100));
    border-radius: 12px;
  }
`

const PageLayoutFooter = styled.footer`
  flex: 1 1 0px;
  padding: 24px 44px;
  background: rgb(var(--color-neutral300));
`

export default PageLayout