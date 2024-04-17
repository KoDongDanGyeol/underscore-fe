export const IconName = {
  ["CaretDown"]: "CaretDown",
  ["CaretUp"]: "CaretUp",
  ["Close"]: "Close",
  ["Left"]: "Left",
  ["Loading"]: "Loading",
  ["Mail"]: "Mail",
  ["Menu"]: "Menu",
  ["Picture"]: "Picture",
  ["Pin"]: "Pin",
  ["Reload"]: "Reload",
  ["Right"]: "Right",
  ["Search"]: "Search",
  ["User"]: "User",
  ["Warning"]: "Warning",
} as const

export type IconName = (typeof IconName)[keyof typeof IconName]
