"use client"

import { useForm } from "react-hook-form"
import styled from "styled-components"
import AuthView from "@/components/display/AuthView"
import Button from "@/components/general/Button"
import EditUser, { EditUserTypes } from "@/components/form/EditUser"

export interface AuthEditUserMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const AuthEditUserMain = (props: AuthEditUserMainProps) => {
  const { className = "", ...restProps } = props

  const editUser = useForm<EditUserTypes>({
    defaultValues: {
      name: "홍길동",
      email: "hong@gmail.com",
    },
  })

  return (
    <AuthEditUserMainContainer className={`${className}`} {...restProps}>
      <AuthView.Header>
        <h2>회원정보 수정</h2>
        <p>회원 정보를 입력해주세요</p>
      </AuthView.Header>
      <EditUser formData={editUser} handleValid={(data: EditUserTypes) => console.log(data)} />
      <AuthView.Action>
        <Button type="submit" form="edit-user">
          저장하기
        </Button>
      </AuthView.Action>
    </AuthEditUserMainContainer>
  )
}

const AuthEditUserMainContainer = styled(AuthView)`
  /*  */
`

export default AuthEditUserMain
