import {useEffect, useState, type Dispatch, type SetStateAction} from 'react'

export function useLocalState<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue)),
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
