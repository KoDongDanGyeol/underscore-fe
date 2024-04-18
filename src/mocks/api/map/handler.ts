import { http, HttpResponse } from "msw"
import { faker } from "@faker-js/faker"
import { TypeSearchAnalysisResult } from "@/queries/api/map/useSearchAnalysis"
import { TypeAnalysisListAllFilter } from "@/queries/api/map"

export const mapHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/map/business-attraction`, ({ request }) => {
    const count = faker.number.int({ min: 0, max: 10 })
    const rect = (new URL(request?.url ?? "").searchParams.get("rect") ?? "")
      ?.split(",")
      ?.map(parseFloat) as TypeAnalysisListAllFilter["searchBounds"]
    return HttpResponse.json<TypeSearchAnalysisResult>({
      count,
      includesUnserviceableAreas: faker.datatype.boolean(),
      labels: [
        "Floating Population",
        "Stores",
        "IncomeConsumption",
        "ResidentPopulation",
        "IndexQuarterlyQuotients",
        "Selling",
      ],
      businessAttractions: new Array(count).fill(null).map((_, index) => {
        const score = new Array(6)
          .fill(null)
          .map((_, index) =>
            faker.number.int({ min: 0, max: 20 }),
          ) as TypeSearchAnalysisResult["businessAttractions"][number]["businessAttractionScores"]
        return {
          legalDistrictCode: `${index + 1}`,
          administrativeDistrictName: `서울특별시 어쩌구 저쩌${index}동`,
          businessAttractionScores: score,
          totalScore: score.reduce((a, b) => a + b),
          coordinates: {
            latitude: faker.number.float({ min: rect[1], max: rect[3], multipleOf: 0.000001 }),
            longitude: faker.number.float({ min: rect[0], max: rect[2], multipleOf: 0.000001 }),
          },
        }
      }),
    })
  }),
]
