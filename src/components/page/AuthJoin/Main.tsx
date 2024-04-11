"use client"

import styled from "styled-components"
import AuthView from "@/components/display/AuthView"
import Button from "@/components/general/Button"

export interface AuthJoinMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const AuthJoinMain = (props: AuthJoinMainProps) => {
  const { className = "", ...restProps } = props

  return (
    <AuthJoinMainContainer className={`${className}`} {...restProps}>
      <AuthView.Header>
        <h2>로그인</h2>
        <p>
          자주 사용하시는 아이디로 간편하게
          <br />
          Underscore 서비스를 이용해보세요
        </p>
      </AuthView.Header>
      <AuthView.Action>
        <ButtonKakao type="button" onClick={() => console.log("kako")}>
          카카오 로그인
        </ButtonKakao>
        <ButtonNaver type="button" onClick={() => console.log("naver")}>
          네이버 로그인
        </ButtonNaver>
        <Button type="button" onClick={() => console.log("google")}>
          구글 로그인
        </Button>
      </AuthView.Action>
    </AuthJoinMainContainer>
  )
}

const ButtonKakao = styled(Button)`
  color: rgb(var(--color-neutral1100));
  background: rgb(var(--color-yellow600));
  border-color: rgb(var(--color-yellow600));
  &:not(:disabled):hover {
    color: rgb(var(--color-neutral1100));
    background: rgb(var(--color-yellow500));
    border-color: rgb(var(--color-yellow500));
  }
  &:not(:disabled):focus-visible {
    outline: 4px solid rgb(var(--color-yellow300));
    outline-offset: 1px;
  }
  &:not(:disabled):active {
    color: rgb(var(--color-neutral1100));
    background: rgb(var(--color-yellow700));
    border-color: rgb(var(--color-yellow700));
  }
`

const ButtonNaver = styled(Button)`
  color: rgb(var(--color-neutral100));
  background: rgb(var(--color-green600));
  border-color: rgb(var(--color-green600));
  &:not(:disabled):hover {
    color: rgb(var(--color-neutral100));
    background: rgb(var(--color-green500));
    border-color: rgb(var(--color-green500));
  }
  &:not(:disabled):focus-visible {
    outline: 4px solid rgb(var(--color-green300));
    outline-offset: 1px;
  }
  &:not(:disabled):active {
    color: rgb(var(--color-neutral100));
    background: rgb(var(--color-green700));
    border-color: rgb(var(--color-green700));
  }
`

const AuthJoinMainContainer = styled(AuthView)`
  /*  */
`

export default AuthJoinMain
