import { http, HttpResponse } from "msw"
import { faker } from "@faker-js/faker"
import { TypeSearchMyplaceResult } from "@/queries/api/user/useSearchMyplaceList"

export const userHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user`, () => {
    return HttpResponse.json({
      data: {
        name: faker.internet.userName(),
        email: faker.internet.email(),
      },
    })
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/myplace`, ({ request }) => {
    const count = faker.number.int({ min: 0, max: 10 })
    const rect = [37.45729722928302, 126.88404737817397, 37.582573216482466, 127.11535414102542]
    return HttpResponse.json<TypeSearchMyplaceResult>({
      count,
      items: new Array(count).fill(null).map((_, index) => ({
        id: index,
        addressName: `서울시 어쩌구 저쩌${index + 1}동`,
        totalScore: faker.number.int({ min: 0, max: 100 }),
        coordinates: {
          latitude: faker.number.float({ min: rect[0], max: rect[2], multipleOf: 0.000001 }),
          longitude: faker.number.float({ min: rect[1], max: rect[3], multipleOf: 0.000001 }),
        },
      })),
    })
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/myplace`, ({ request }) => {
    return new HttpResponse(null, { status: faker.datatype.boolean() ? 200 : 400 })
  }),
  http.delete(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/myplace/:id`, async ({ params }) => {
    return new HttpResponse(null, { status: faker.datatype.boolean() ? 200 : 400 })
  }),
]
