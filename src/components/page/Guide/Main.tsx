"use client"

import { useForm } from "react-hook-form"
import FormGuide, { FormGuideTypes } from "@/components/form/FormGuide"

export interface GuideMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
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

  return (
    <div className={`${className}`} {...restProps}>
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
