import { http, HttpResponse } from "msw"
import { faker } from "@faker-js/faker"
import { TypeSearchMyplaceResult } from "@/queries/api/user/useSearchMyplaceList"
import { TypeSearchProfileResult } from "@/queries/api/user/useSearchProfile"
import { TypeSearchMembershipResult } from "@/queries/api/user/useSearchMembership"
import { TypeSearchPaymentListResult } from "@/queries/api/user/useSearchPaymentList"
import { TypeSubscriptionCode } from "@/components/form/ChangeMembership/type"
import { TypePaymentStateCode } from "@/components/form/SearchPayment/type"
import { TypeSearchPaymentDetailResult } from "@/queries/api/user/useSearchPaymentDetail"

export const userHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/profile`, () => {
    return HttpResponse.json<TypeSearchProfileResult>({
      name: "홍길동",
      email: "hong@gmail.com",
      isSubscribed: true,
    })
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/profile`, () => {
    return new HttpResponse(null, { status: faker.datatype.boolean() ? 200 : 400 })
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/myplace`, () => {
    const count = faker.number.int({ min: 0, max: 10 })
    const rect = [37.45729722928302, 126.88404737817397, 37.582573216482466, 127.11535414102542]
    return HttpResponse.json<TypeSearchMyplaceResult>({
      count,
      totalCount: count,
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
  http.post(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/myplace`, () => {
    return new HttpResponse(null, { status: faker.datatype.boolean() ? 200 : 400 })
  }),
  http.delete(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/myplace/:id`, async () => {
    return new HttpResponse(null, { status: faker.datatype.boolean() ? 200 : 400 })
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/membership`, () => {
    return HttpResponse.json<TypeSearchMembershipResult>(
      faker.datatype.boolean()
        ? {
            isSubscribed: true,
            subscriptionCode: TypeSubscriptionCode["Month"],
            effectiveDate: new Date("2024-04-01"),
            expirationDate: new Date("2024-04-30"),
            paymentMethod: "카카오페이",
            paymentInfo: "123*****910/일시불",
            paymentAmount: 9900,
            refundAmount: 4950,
          }
        : {
            isSubscribed: false,
            subscriptionCode: "free",
          },
    )
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/membership`, () => {
    return new HttpResponse(null, { status: faker.datatype.boolean() ? 200 : 400 })
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/payment`, () => {
    return HttpResponse.json<TypeSearchPaymentListResult>({
      count: 5,
      totalCount: 5,
      items: [
        {
          id: faker.number.int({ min: 100000, max: 999999 }),
          subscriptionCode: TypeSubscriptionCode["Month"],
          effectiveDate: new Date("2024-04-01"),
          expirationDate: new Date("2024-04-30"),
          paymentMethod: "카카오페이",
          paymentInfo: "123*****910/일시불",
          paymentState: TypePaymentStateCode["PaymentScheduled"],
          paymentAmount: 9900,
          paymentDate: new Date("2024-04-30"),
          billingDate: new Date("2024-04-30"),
          errorCode: "AAAA",
          errorMessage: "잔액부족",
        },
        {
          id: faker.number.int({ min: 100000, max: 999999 }),
          subscriptionCode: TypeSubscriptionCode["Month"],
          effectiveDate: new Date("2024-04-01"),
          expirationDate: new Date("2024-04-30"),
          paymentMethod: "카카오페이",
          paymentInfo: "123*****910/일시불",
          paymentState: TypePaymentStateCode["PaymentCompleted"],
          paymentAmount: 9900,
          paymentDate: new Date("2024-04-30"),
          billingDate: new Date("2024-04-30"),
          errorCode: "AAAA",
          errorMessage: "잔액부족",
        },
        {
          id: faker.number.int({ min: 100000, max: 999999 }),
          subscriptionCode: TypeSubscriptionCode["Month"],
          effectiveDate: new Date("2024-04-01"),
          expirationDate: new Date("2024-04-30"),
          paymentMethod: "카카오페이",
          paymentInfo: "123*****910/일시불",
          paymentState: TypePaymentStateCode["CancellationComplete"],
          paymentAmount: 9900,
          paymentDate: new Date("2024-04-30"),
          billingDate: new Date("2024-04-30"),
          errorCode: "AAAA",
          errorMessage: "잔액부족",
        },
        {
          id: faker.number.int({ min: 100000, max: 999999 }),
          subscriptionCode: TypeSubscriptionCode["Month"],
          effectiveDate: new Date("2024-04-01"),
          expirationDate: new Date("2024-04-30"),
          paymentMethod: "카카오페이",
          paymentInfo: "123*****910/일시불",
          paymentState: TypePaymentStateCode["PaymentFailed"],
          paymentAmount: 9900,
          paymentDate: new Date("2024-04-30"),
          billingDate: new Date("2024-04-30"),
          errorCode: "AAAA",
          errorMessage: "잔액부족",
        },
      ],
    })
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/mocks/user/payment/:id`, () => {
    const index = faker.number.int({ min: 0, max: 3 })
    return HttpResponse.json<TypeSearchPaymentDetailResult>(
      [
        {
          id: faker.number.int({ min: 100000, max: 999999 }),
          subscriptionCode: TypeSubscriptionCode["Month"],
          effectiveDate: new Date("2024-04-01"),
          expirationDate: new Date("2024-04-30"),
          paymentMethod: "카카오페이",
          paymentInfo: "123*****910/일시불",
          paymentState: TypePaymentStateCode["PaymentScheduled"],
          paymentAmount: 9900,
          paymentDate: new Date("2024-04-30"),
          billingDate: new Date("2024-04-30"),
          errorCode: "AAAA",
          errorMessage: "잔액부족",
        },
        {
          id: faker.number.int({ min: 100000, max: 999999 }),
          subscriptionCode: TypeSubscriptionCode["Month"],
          effectiveDate: new Date("2024-04-01"),
          expirationDate: new Date("2024-04-30"),
          paymentMethod: "카카오페이",
          paymentInfo: "123*****910/일시불",
          paymentState: TypePaymentStateCode["PaymentCompleted"],
          paymentAmount: 9900,
          paymentDate: new Date("2024-04-30"),
          billingDate: new Date("2024-04-30"),
          errorCode: "AAAA",
          errorMessage: "잔액부족",
        },
        {
          id: faker.number.int({ min: 100000, max: 999999 }),
          subscriptionCode: TypeSubscriptionCode["Month"],
          effectiveDate: new Date("2024-04-01"),
          expirationDate: new Date("2024-04-30"),
          paymentMethod: "카카오페이",
          paymentInfo: "123*****910/일시불",
          paymentState: TypePaymentStateCode["CancellationComplete"],
          paymentAmount: 9900,
          paymentDate: new Date("2024-04-30"),
          billingDate: new Date("2024-04-30"),
          errorCode: "AAAA",
          errorMessage: "잔액부족",
        },
        {
          id: faker.number.int({ min: 100000, max: 999999 }),
          subscriptionCode: TypeSubscriptionCode["Month"],
          effectiveDate: new Date("2024-04-01"),
          expirationDate: new Date("2024-04-30"),
          paymentMethod: "카카오페이",
          paymentInfo: "123*****910/일시불",
          paymentState: TypePaymentStateCode["PaymentFailed"],
          paymentAmount: 9900,
          paymentDate: new Date("2024-04-30"),
          billingDate: new Date("2024-04-30"),
          errorCode: "AAAA",
          errorMessage: "잔액부족",
        },
      ][index],
    )
  }),
]
