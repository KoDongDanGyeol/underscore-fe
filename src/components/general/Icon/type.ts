export const IconName = {
  ["CaretDown"]: "CaretDown",
  ["CaretUp"]: "CaretUp",
  ["Close"]: "Close",
  ["Mail"]: "Mail",
  ["Menu"]: "Menu",
  ["Picture"]: "Picture",
  ["User"]: "User",
} as const

export type IconName = (typeof IconName)[keyof typeof IconName]
