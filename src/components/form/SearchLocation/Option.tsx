"use client"

import styled from "styled-components"
import { TypeSearchLocationResult } from "@/queries/api/map/useSearchLocation"

export interface SearchLocationOptionProps extends React.HTMLAttributes<HTMLButtonElement> {
  data: TypeSearchLocationResult["documents"][number]
  onClick: () => void
}

const SearchLocationOption = (props: SearchLocationOptionProps) => {
  const { data, className = "", onClick, ...restProps } = props

  return (
    <SearchLocationOptionContainer
      role="option"
      type="button"
      className={`${className}`}
      onClick={onClick}
      {...restProps}
    >
      {data.address_name}
    </SearchLocationOptionContainer>
  )
}

const SearchLocationOptionContainer = styled.button`
  display: block;
  width: 100%;
  padding: 5px 8px;
  text-align: left;
  &:hover,
  &:focus {
    background: rgb(var(--color-neutral300));
  }
`

export default SearchLocationOption
