import {ref, watchEffect, toValue, type ComputedRef, type Ref} from 'vue'

export function useFetch<T = unknown>(url: ComputedRef<string> | Ref<string>) {
  const data = ref<T|null>(null)
  const error = ref(null)

  const fetchData = () => {
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
