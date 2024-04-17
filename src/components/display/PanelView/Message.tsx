"use client"

import styled from "styled-components"

export interface PanelViewMessageProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  //
}

const PanelViewMessage = (props: PanelViewMessageProps) => {
  const { className = "", children, ...restProps } = props

  return (
    <PanelViewMessageContainer className={`${className}`} {...restProps}>
      {children}
    </PanelViewMessageContainer>
  )
}

const PanelViewMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 24px 0;
  padding: 0 20px;
  strong {
    display: block;
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
    font-weight: 600;
    em {
      color: rgb(var(--color-primary600));
    }
  }
  span {
    color: rgb(var(--color-neutral800));
  }
`

export default PanelViewMessage
