import { http, HttpResponse } from "msw"
import { faker } from "@faker-js/faker"

const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/api/user`, () => {
    return HttpResponse.json({
      data: {
        name: faker.internet.userName(),
        email: faker.internet.email(),
      },
    })
  }),
]

export default handlers
