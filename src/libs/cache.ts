import { CacheKey, CacheKeyHelper } from "@/types/cache"

export function getCacheKey<T extends CacheKey>(keyConfig: T, prefix: string[] = []): CacheKeyHelper<T> {
  const keyFn = (name: string) => prefix.concat([name])
  const toolObj = {} as CacheKey
  for (const k of Object.keys(keyConfig)) {
    const v = keyConfig[k]
    if (typeof v === "function") {
      toolObj[k] = {
        toKeyWithArgs: (...args: unknown[]) => [...keyFn(k), ...v(...args)],
        toKey: () => keyFn(k),
      }
    } else if (v instanceof Object) {
      toolObj[k] = { toKey: () => keyFn(k), ...getCacheKey(v as CacheKey, keyFn(k)) }
    } else {
      toolObj[k] = {
        toKey: () => keyFn(k),
      }
    }
  }
  return toolObj as CacheKeyHelper<T>
}
