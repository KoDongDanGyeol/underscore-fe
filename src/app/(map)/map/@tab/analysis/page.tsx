import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { getCacheKey } from "@/libs/cache"
import { mapKey } from "@/queries/api/map"
import { fetchSearchBusinessList } from "@/queries/api/map/useSearchBusinessList"
import MapAnalysis from "@/components/page/MapAnalysis"

interface PageProps {
  //
}

const Page = async (props: PageProps) => {
  // const { } = props

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: getCacheKey(mapKey).business.list.all.toKeyWithArgs(1),
    queryFn: async () => {
      const data = await fetchSearchBusinessList(1, {})
      return data
    },
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <MapAnalysis />
    </HydrationBoundary>
  )
}

export default Page
