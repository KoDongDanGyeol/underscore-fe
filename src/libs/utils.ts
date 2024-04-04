export type Nullable<T> = T | null | undefined

export type NonNullable<T> = T extends null | undefined ? never : T

export type NonUndefined<T> = T extends undefined ? never : T

export type ObjectEntries<T extends object> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export type ObjectKeys<T extends object> = Array<keyof T>

export type ObjectValues<T extends object> = Array<T[keyof T]>
