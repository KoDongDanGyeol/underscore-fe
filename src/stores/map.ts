"use client"

import { atom } from "recoil"

export type TypeMap = {
  mode: "Advanced" | "Simplified"
  level: number
  center: [number, number]
  bounds: [number, number, number, number]
  isInitialized: boolean
}

export const atomMap = atom<TypeMap>({
  key: "atomMap",
  default: {
    mode: "Simplified",
    level: 3,
    center: [0, 0],
    bounds: [0, 0, 0, 0],
    isInitialized: false,
  },
  effects: [],
})
