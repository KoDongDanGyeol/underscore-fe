type Cast<X, Y> = X extends Y ? X : Y

type Fn = (...args: any[]) => any[]

export type CacheKey = {
  [k: string]: CacheKey | Fn | unknown
}

export type CacheKeyHelper<T extends CacheKey, P extends string[] = []> = {
  [k in keyof T]: T[k] extends (...args: any[]) => any[]
    ? {
        toKey: () => [...P, k]
        toKeyWithArgs: (...args: Parameters<T[k]>) => [...P, k, ...ReturnType<T[k]>]
      }
    : T[k] extends CacheKey
      ? { toKey: () => [...P, k] } & CacheKeyHelper<Cast<T[k], CacheKey>, Cast<[...P, k], string[]>>
      : { toKey: () => [...P, k] }
}
