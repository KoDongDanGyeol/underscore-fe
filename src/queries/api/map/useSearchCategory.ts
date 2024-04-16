import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { getCacheKey } from "@/libs/cache"
import { TypeCategoryListAllId, TypeCategoryListAllFilter, mapKey } from "@/queries/api/map/type"
import { TypeFetchList } from "@/types/cache"

export type TypeSearchCategoryResult = {
  meta: {
    total_count: number
    pageable_count: number
    is_end: boolean
    same_name: {
      region: string[]
      keyword: string
      selected_region: string
    } | null
  }
  documents: {
    id: string
    place_name: string
    category_name: string
    category_group_code: string
    category_group_name: string
    phone: string
    address_name: string
    road_address_name: string
    x: string
    y: string
    place_url: string
    distance: string
  }[]
}

const fetchSearchCategory: TypeFetchList<TypeSearchCategoryResult, TypeCategoryListAllFilter> = async (
  page,
  { level, categoryCode, rect, size },
) => {
  const { data } = await axios<TypeSearchCategoryResult>({
    method: "GET",
    url: `/map/search-category?categoryCode=${categoryCode}&rect=${rect}&size=${size}&page=${page}`,
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KAKAO_REST_KEY}`,
    },
  })
  return data
}

const useSearchCategory = (
  page: TypeCategoryListAllId,
  { level, categoryCode, rect, size }: TypeCategoryListAllFilter,
) => {
  const context = useQuery({
    queryKey: getCacheKey(mapKey).category.list.all.toKeyWithArgs(page, { level, categoryCode, rect, size }),
    queryFn: async () => {
      const data = await fetchSearchCategory(page, { level, categoryCode, rect, size })
      return data
    },
    enabled: !!page && !!categoryCode && !!rect && [1, 2, 3].includes(level),
    staleTime: 1000 * 60 * 60 * 23,
    gcTime: 1000 * 60 * 60 * 24,
  })

  return {
    ...context,
  }
}

export default useSearchCategory
