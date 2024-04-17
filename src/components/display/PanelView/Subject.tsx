"use client"

import styled, { css } from "styled-components"
import Icon, { IconName } from "@/components/general/Icon"
import { PanelViewSubjectStatusCode } from "@/components/display/PanelView/type"

export interface PanelViewSubjectProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  status: { code: PanelViewSubjectStatusCode; message: string }
  count?: number
  suffixEl?: React.ReactNode
}

const PanelViewSubject = (props: PanelViewSubjectProps) => {
  const { status, count, suffixEl = null, className = "", children, ...restProps } = props

  return (
    <PanelViewSubjectContainer $statusCode={status.code} className={`${className}`} {...restProps}>
      <PanelViewSubjectContent>{children}</PanelViewSubjectContent>
      {status.code in IconName && (
        <PanelViewSubjectStatus>
          <Icon name={status.code as IconName} aria-hidden={true} />
          <span className="sr-only">{status.message}</span>
        </PanelViewSubjectStatus>
      )}
      {!Number.isNaN(count) && <PanelViewSubjectCount>{count}</PanelViewSubjectCount>}
      {suffixEl && <span className="extra-suffix">{suffixEl}</span>}
    </PanelViewSubjectContainer>
  )
}

interface PanelViewSubjectStyled {
  $statusCode: PanelViewSubjectProps["status"]["code"]
}

const PanelViewSubjectContent = styled.strong`
  font-weight: 500;
`

const PanelViewSubjectStatus = styled.div`
  flex: 1 1 0px;
  font-size: 12px;
`

const PanelViewSubjectCount = styled.div`
  flex: 1 1 0px;
  color: rgb(var(--color-neutral700));
`

const PanelViewSubjectContainer = styled.div<PanelViewSubjectStyled>`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 38px;
  padding: 0 20px;
  background: rgb(var(--color-neutral100));
  border-bottom: 1px solid rgb(var(--color-neutral400));
  &:not(:first-child) {
    margin-top: 10px;
  }
  .extra-suffix {
    flex: 1 1 0px;
    display: inline-flex;
    justify-content: flex-end;
  }
  ${(props) => {
    switch (props.$statusCode) {
      case PanelViewSubjectStatusCode.Loading:
        return css`
          ${PanelViewSubjectStatus} {
            color: rgb(var(--color-primary600));
          }
        `
      case PanelViewSubjectStatusCode.Warning:
        return css`
          ${PanelViewSubjectStatus} {
            color: rgb(var(--color-yellow700));
          }
        `
      case PanelViewSubjectStatusCode.Success:
      default:
        return css`
          ${PanelViewSubjectStatus} {
            /*  */
          }
        `
    }
  }}
`

export default PanelViewSubject
