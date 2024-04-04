"use client"

import { useForm } from "react-hook-form"
import FormGuide, { FormGuideTypes } from "@/components/form/FormGuide"

export interface GuideMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const fetchUser = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/api/user`)
  return response.json()
}

const GuideMain = (props: GuideMainProps) => {
  const { className = "", ...restProps } = props

  const example = useForm<FormGuideTypes>({
    defaultValues: {
      email: "",
      name: "",
      description: "description",
    },
  })

  const testMocks = async () => {
    const { data: userData } = await fetchUser()
    example.setValue("name", userData.name)
    example.setValue("email", userData.email)
  }

  return (
    <div className={`${className}`} {...restProps}>
      <button onClick={testMocks}>testMocks</button>
      <FormGuide
        formData={example}
        formAction={{
          cancel: "취소",
          reset: "초기화",
          submit: "등록",
        }}
        formPlaceholder={{
          email: "Email Placeholder",
          name: "Name Placeholder",
          description: "Description Placeholder",
        }}
        handleValid={(data) => console.log(data)}
      />
    </div>
  )
}

export default GuideMain
