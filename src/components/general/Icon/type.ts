export const IconName = {
  ["CaretDown"]: "CaretDown",
  ["CaretUp"]: "CaretUp",
  ["Close"]: "Close",
  ["Loading"]: "Loading",
  ["Mail"]: "Mail",
  ["Menu"]: "Menu",
  ["Picture"]: "Picture",
  ["Search"]: "Search",
  ["User"]: "User",
} as const

export type IconName = (typeof IconName)[keyof typeof IconName]
