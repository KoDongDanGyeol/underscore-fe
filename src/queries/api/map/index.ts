import { locationMapKey } from "@/queries/api/map/location/type"
import { categoryMapKey } from "@/queries/api/map/category/type"
import { businessMapKey } from "@/queries/api/map/business/type"
import { TypeCategoryCode } from "@/components/form/SearchCategory/type"

export { TypeCategoryCode }
export type { TypeLocationListAllId, TypeLocationListAllFilter } from "@/queries/api/map/location/type"
export type { TypeCategoryListAllId, TypeCategoryListAllFilter } from "@/queries/api/map/category/type"
export type { TypeBusinessListAllId } from "@/queries/api/map/business/type"

export const mapKey = {
  location: locationMapKey,
  category: categoryMapKey,
  business: businessMapKey,
}
