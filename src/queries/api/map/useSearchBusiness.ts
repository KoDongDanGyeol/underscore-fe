import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { getCacheKey } from "@/libs/cache"
import { TypeBusinessListAllId, mapKey } from "@/queries/api/map"
import { TypeFetchList } from "@/types/cache"

export type TypeSearchBusinessResult = {
  [key in string]: string
}

export const fetchSearchBusiness: TypeFetchList<TypeSearchBusinessResult> = async (page) => {
  const { data } = await axios<TypeSearchBusinessResult>({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/map/serviceIndustryData`,
  })
  return data
}

const useSearchBusiness = (page: TypeBusinessListAllId) => {
  const context = useQuery({
    queryKey: getCacheKey(mapKey).business.list.all.toKeyWithArgs(page),
    queryFn: async () => {
      const data = await fetchSearchBusiness(page, {})
      return data
    },
    enabled: !!page,
    staleTime: 1000 * 60 * 60 * 23,
    gcTime: 1000 * 60 * 60 * 24,
  })

  return {
    ...context,
  }
}

export default useSearchBusiness
