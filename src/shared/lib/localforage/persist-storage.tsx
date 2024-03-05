import { getItem, setItem } from 'localforage'

export const persistStorage = {
  getItem: <T,>(key: string) => {
    return getItem<T>(key)
  },

  getItemSafe: async <T,>(key: string, defaultValue: T) => {
    return getItem<T>(key).then(res => (res === null ? defaultValue : res))
  },
  setItemSafe: <T,>(key: string, value: T) => {
    try {
      return setItem(key, value)
    } catch (e) {
      return Promise.resolve(null)
    }
  },
}
