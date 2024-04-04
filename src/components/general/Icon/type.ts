export const IconName = {
  ["User"]: "User",
  ["Mail"]: "Mail",
} as const

export type IconName = (typeof IconName)[keyof typeof IconName]
