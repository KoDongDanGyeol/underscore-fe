import { TypeCacheKey, TypeCacheKeyHelper } from "@/types/cache"

export function getCacheKey<T extends TypeCacheKey>(keyConfig: T, prefix: string[] = []): TypeCacheKeyHelper<T> {
  const keyFn = (name: string) => prefix.concat([name])
  const toolObj = {} as TypeCacheKey
  for (const k of Object.keys(keyConfig)) {
    const v = keyConfig[k]
    if (typeof v === "function") {
      toolObj[k] = {
        toKeyWithArgs: (...args: unknown[]) => [...keyFn(k), ...v(...args)],
        toKey: () => keyFn(k),
      }
    } else if (v instanceof Object) {
      toolObj[k] = { toKey: () => keyFn(k), ...getCacheKey(v as TypeCacheKey, keyFn(k)) }
    } else {
      toolObj[k] = {
        toKey: () => keyFn(k),
      }
    }
  }
  return toolObj as TypeCacheKeyHelper<T>
}
