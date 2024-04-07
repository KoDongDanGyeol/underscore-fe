"use client"

import styled from "styled-components"
import Layout from "@/components/display/Layout"
import Copyright from "@/components/navigation/Copyright"

interface GuideLayoutProps extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> {
  //
}

const GuideLayout = (props: GuideLayoutProps) => {
  const { className = "", children } = props

  return (
    <Layout className={`${className}`}>
      <Layout.Header />
      <Layout.Navigation />
      <Layout.Content>
        {children}
        <Footer>
          <Copyright />
        </Footer>
      </Layout.Content>
    </Layout>
  )
}

const Footer = styled.footer`
  /*  */
`

export default GuideLayout
