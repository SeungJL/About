export const groupBy = function<T, K>(collection: T[], getKey: (element: T) => K) {
  const group = new Map<K, T[]>()
  collection.forEach((element) => {
    const key = getKey(element)
    const value = group.get(key)
    value ? group.set(key, [...value, element]) : group.set(key, [element])
  })

  return group
};
