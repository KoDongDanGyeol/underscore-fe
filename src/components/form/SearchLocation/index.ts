import { FieldValues } from "react-hook-form"
import SearchLocationMain, { SearchLocationMainProps } from "@/components/form/SearchLocation/Main"
import SearchLocationOption, { SearchLocationOptionProps } from "@/components/form/SearchLocation/Option"

export interface TypeSearchLocation extends FieldValues {
  location?: string
}

export type { SearchLocationMainProps, SearchLocationOptionProps }

export default Object.assign(SearchLocationMain, {
  Option: SearchLocationOption,
})
