import { FieldValues } from "react-hook-form"
import SearchCategoryMain, { SearchCategoryMainProps } from "@/components/form/SearchCategory/Main"
import { TypeCategoryCode } from "@/components/form/SearchCategory/type"

export interface TypeSearchCategory extends FieldValues {
  categoryCode: TypeCategoryCode
}

export type { SearchCategoryMainProps }

export default Object.assign(SearchCategoryMain, {
  //
})
