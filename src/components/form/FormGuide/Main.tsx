"use client"

import { FieldValues } from "react-hook-form"
import styled from "styled-components"
import FormHoc, { FormHocMainProps } from "@/components/entry/FormHoc"
import { TypeFormGuide } from "@/components/form/FormGuide"
import Icon from "@/components/general/Icon"
import Button from "@/components/general/Button"
import Label from "@/components/entry/Label"
import Input from "@/components/entry/Input"
import Helper from "@/components/entry/Helper"

export interface FormGuideMainProps<T extends FieldValues = TypeFormGuide> extends FormHocMainProps<T> {
  //
}

const FormGuideMain = FormHoc<TypeFormGuide>((props: FormGuideMainProps) => {
  const { formAction, formData, formPlaceholder, isLoading, handleValid, ...restProps } = props

  const { control, handleSubmit, formState } = formData

  return (
    <FormGuideMainContainer id="form-guide" onSubmit={handleSubmit(handleValid)} noValidate {...restProps}>
      <FormHoc.Row>
        <FormHoc.Group>
          <Label asTag="label" htmlFor="email" isRequired={true}>
            이메일
          </Label>
          <Input<TypeFormGuide>
            control={control}
            name="email"
            rules={{
              required: {
                value: true,
                message: "이메일을 입력해주세요",
              },
            }}
            type="email"
            placeholder={formPlaceholder?.email}
            prefixEl={<Icon name="Mail" aria-hidden={true} />}
          />
          <Helper>email</Helper>
          <Helper variants="error">{formState?.errors?.email?.message}</Helper>
        </FormHoc.Group>
      </FormHoc.Row>

      <FormHoc.Row>
        <FormHoc.Group>
          <Label asTag="label" htmlFor="name" isRequired={true}>
            이름
          </Label>
          <Input<TypeFormGuide>
            control={control}
            name="name"
            rules={{
              required: {
                value: true,
                message: "이름을 입력해주세요",
              },
            }}
            type="text"
            placeholder={formPlaceholder?.name}
            prefixEl={<Icon name="User" aria-hidden={true} />}
          />
          <Helper variants="error">{formState?.errors?.name?.message}</Helper>
        </FormHoc.Group>
      </FormHoc.Row>

      <FormHoc.Row>
        <FormHoc.Group>
          <Label asTag="span">ReadOnly</Label>
          <Input<TypeFormGuide>
            control={control}
            name="description"
            rules={{}}
            type="text"
            readOnly={true}
            placeholder={formPlaceholder?.description}
          />
          <Helper variants="error">{formState?.errors?.description?.message}</Helper>
        </FormHoc.Group>
        <FormHoc.Group>
          <Label asTag="span">Disabled</Label>
          <Input<TypeFormGuide>
            control={control}
            name="description"
            rules={{}}
            type="text"
            disabled={true}
            placeholder={formPlaceholder?.description}
          />
          <Helper variants="error">{formState?.errors?.description?.message}</Helper>
        </FormHoc.Group>
      </FormHoc.Row>

      <FormHoc.Action>
        <Button type="button" variants="secondary" disabled={isLoading}>
          {formAction?.cancel ?? "Cancel"}
        </Button>
        <Button type="reset" variants="secondary" disabled={isLoading}>
          {formAction?.reset ?? "Reset"}
        </Button>
        <Button type="submit" variants="primary" disabled={isLoading}>
          {formAction?.submit ?? "Submit"}
        </Button>
      </FormHoc.Action>
    </FormGuideMainContainer>
  )
})

const FormGuideMainContainer = styled.form`
  /*  */
`

export default FormGuideMain
