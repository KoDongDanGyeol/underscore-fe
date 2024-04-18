import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { isEquals } from "@/libs/utils"
import { getCacheKey, getToken } from "@/libs/cache"
import { TypeAnalysisListAllId, TypeAnalysisListAllFilter, mapKey } from "@/queries/api/map"
import { TypeFetchList } from "@/types/cache"

export type TypeSearchAnalysisResult = {
  count: number
  includesUnserviceableAreas: boolean
  labels: [string, string, string, string, string, string]
  businessAttractions: {
    legalDistrictCode: string
    administrativeDistrictName: string
    businessAttractionScores: [number, number, number, number, number, number]
    totalScore: number
    coordinates: { latitude: number; longitude: number }
  }[]
}

const fetchSearchAnalysis: TypeFetchList<TypeSearchAnalysisResult, TypeAnalysisListAllFilter> = async (
  page,
  { level, searchBounds, businessCode },
) => {
  // TODO
  // const token = await getToken()
  // const { data } = await axios<TypeSearchAnalysisResult>({
  //   method: "GET",
  //   url: `${process.env.NEXT_PUBLIC_API_URL}/api/map/business-attraction`,
  //   params: {
  //     page,
  //     rect: `${searchBounds[1]},${searchBounds[0]},${searchBounds[3]},${searchBounds[2]}`,
  //     serviceIndustryCode: businessCode,
  //   },
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  const { data } = await axios<TypeSearchAnalysisResult>({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/map/business-attraction`,
    params: {
      page,
      rect: `${searchBounds[1]},${searchBounds[0]},${searchBounds[3]},${searchBounds[2]}`,
      serviceIndustryCode: businessCode,
    },
  })
  return data
}

const useSearchAnalysis = (
  page: TypeAnalysisListAllId,
  { level, searchBounds, businessCode }: TypeAnalysisListAllFilter,
) => {
  const context = useQuery({
    queryKey: getCacheKey(mapKey).analysis.list.all.toKeyWithArgs(page, { level, searchBounds, businessCode }),
    queryFn: async () => {
      const data = await fetchSearchAnalysis(page, { level, searchBounds, businessCode })
      return data
    },
    enabled: !!page && !!businessCode && !isEquals([0, 0, 0, 0], searchBounds) && [1, 2, 3].includes(level),
    staleTime: 1000 * 60 * 60 * 23,
    gcTime: 1000 * 60 * 60 * 24,
  })

  return {
    ...context,
  }
}

export default useSearchAnalysis
