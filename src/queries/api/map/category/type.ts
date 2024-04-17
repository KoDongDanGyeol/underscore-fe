import { TypeCategoryCode } from "@/components/form/SearchCategory/type"

export type TypeCategoryListAllId = number
export type TypeCategoryListAllFilter = { level: number; categoryCode: TypeCategoryCode; rect: string; size: number }

export const categoryMapKey = {
  list: {
    all: (kidId: TypeCategoryListAllId, filter: TypeCategoryListAllFilter) => [kidId, filter],
  },
}
