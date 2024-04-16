export const PanelViewSubjectStatusCode = {
  Loading: "Loading",
  Warning: "Warning",
  Success: "Success",
} as const

export type PanelViewSubjectStatusCode = (typeof PanelViewSubjectStatusCode)[keyof typeof PanelViewSubjectStatusCode]
