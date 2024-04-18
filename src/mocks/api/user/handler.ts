import { http, HttpResponse } from "msw"
import { faker } from "@faker-js/faker"

export const userHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user`, () => {
    return HttpResponse.json({
      data: {
        name: faker.internet.userName(),
        email: faker.internet.email(),
      },
    })
  }),
]
