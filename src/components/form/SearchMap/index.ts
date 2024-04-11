import { FieldValues } from "react-hook-form"
import SearchMapMain, { SearchMapMainProps } from "@/components/form/SearchMap/Main"

export interface SearchMapTypes extends FieldValues {
  keyword?: string
}

export type { SearchMapMainProps }

export default Object.assign(SearchMapMain, {
  //
})
