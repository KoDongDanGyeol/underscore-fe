import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { getCacheKey } from "@/libs/cache"
import { mapKey } from "@/queries/api/map"
import { fetchSearchBusiness } from "@/queries/api/map/useSearchBusiness"
import MapReportAnalysis from "@/components/page/MapReportAnalysis"

interface PageProps {
  //
}

const Page = async (props: PageProps) => {
  // const { } = props

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: getCacheKey(mapKey).business.list.all.toKeyWithArgs(1),
    queryFn: async () => {
      const data = await fetchSearchBusiness(1, {})
      return data
    },
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <MapReportAnalysis />
    </HydrationBoundary>
  )
}

export default Page
