import { myplaceKey } from "@/queries/api/user/myplace/type"
import { membershipKey } from "@/queries/api/user/membership/type"
import { profileKey } from "@/queries/api/user/profile/type"

export type { TypeMyplaceListAllId, TypeMyplaceListAllFilter } from "@/queries/api/user/myplace/type"
export type { TypeMyplaceDetailDefaultId } from "@/queries/api/user/myplace/type"

export const userKey = {
  profile: profileKey,
  membership: membershipKey,
  myplace: myplaceKey,
}
