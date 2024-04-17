import { locationMapKey } from "@/queries/api/map/location/type"
import { categoryMapKey } from "@/queries/api/map/category/type"
import { TypeCategoryCode } from "@/components/form/SearchCategory/type"

export { TypeCategoryCode }
export type { TypeLocationListAllId, TypeLocationListAllFilter } from "@/queries/api/map/location/type"
export type { TypeCategoryListAllId, TypeCategoryListAllFilter } from "@/queries/api/map/category/type"

export const mapKey = {
  location: locationMapKey,
  category: categoryMapKey,
}
