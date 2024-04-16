export type TypeLocationListAllId = number
export type TypeLocationListAllFilter = { location: string }

export const locationMapKey = {
  list: {
    all: (kidId: TypeLocationListAllId, filter: TypeLocationListAllFilter) => [kidId, filter],
  },
}
