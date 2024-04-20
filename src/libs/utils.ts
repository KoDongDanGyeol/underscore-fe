export type Nullable<T> = T | null | undefined

export type NonNullable<T> = T extends null | undefined ? never : T

export type NonUndefined<T> = T extends undefined ? never : T

export type ObjectEntries<T extends object> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export type ObjectKeys<T extends object> = Array<keyof T>

export type ObjectValues<T extends object> = Array<T[keyof T]>

export const isEquals = (...arrays: unknown[][]): boolean => {
  if (arrays.length < 2) return false
  const [firstArray, ...restArrays] = arrays
  return restArrays.every((arr) => isEqualsInternal(firstArray, arr))
}

export const isEqualsInternal = (arr1: unknown[], arr2: unknown[]): boolean => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((element, index) => {
    if (!Array.isArray(element) || !Array.isArray(arr2[index])) return element === arr2[index]
    return isEqualsInternal(element, arr2[index] as unknown[])
  })
}

export const getDiffDate = (startDate: Date, endDate: Date) => {
  const time = Math.abs(endDate.getTime() - startDate.getTime())
  return Math.ceil(time / (1000 * 60 * 60 * 24))
}

export const convertDateToString = (date: Date, format: string = "yyyy-mm-dd") => {
  const match = date.toISOString().match(/(?<yyyy>\d{4})-(?<mm>\d{2})-(?<dd>\d{2})/)
  const formatted = format
    .replace(/yyyy/g, match?.groups?.yyyy ?? "")
    .replace(/mm/g, match?.groups?.mm ?? "")
    .replace(/dd/g, match?.groups?.dd ?? "")
  return formatted
}
