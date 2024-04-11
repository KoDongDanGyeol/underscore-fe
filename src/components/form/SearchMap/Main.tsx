"use client"

import { FieldValues } from "react-hook-form"
import styled from "styled-components"
import FormHoc, { FormHocMainProps } from "@/components/entry/FormHoc"
import { SearchMapTypes } from "@/components/form/SearchMap"
import Icon from "@/components/general/Icon"
import Label from "@/components/entry/Label"
import Input from "@/components/entry/Input"

export interface SearchMapMainProps<T extends FieldValues = SearchMapTypes> extends FormHocMainProps<T> {
  //
}

const SearchMapMain = FormHoc<SearchMapTypes>((props: SearchMapMainProps) => {
  const { formAction, formData, formPlaceholder, isLoading, handleValid, ...restProps } = props

  const { control, handleSubmit, formState } = formData

  return (
    <SearchMapMainContainer id="search-map" onSubmit={handleSubmit(handleValid)} noValidate {...restProps}>
      <Label asTag="label" htmlFor="keyword" isRequired={true} className="sr-only">
        검색
      </Label>
      <SearchMapMainInput
        control={control}
        name="keyword"
        rules={{}}
        type="keyword"
        placeholder={formPlaceholder?.keyword}
        suffixEl={
          <button type="submit">
            <Icon name="Search" aria-hidden={true} />
            <span className="sr-only">{formAction?.submit}</span>
          </button>
        }
      />
    </SearchMapMainContainer>
  )
})

const SearchMapMainInput = styled(Input<SearchMapTypes>)`
  border: none;
`

const SearchMapMainContainer = styled.form`
  /*  */
`

export default SearchMapMain
