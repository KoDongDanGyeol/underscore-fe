"use client"

import { atom } from "recoil"

export type TypeMap = {
  isInitialized: boolean
  bounds: [number, number, number, number]
}

export const atomMap = atom<TypeMap>({
  key: "atomMap",
  default: {
    isInitialized: false,
    bounds: [0, 0, 0, 0],
  },
  effects: [],
})
