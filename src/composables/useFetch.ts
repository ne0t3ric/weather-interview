import {ref, watchEffect, toValue, type ComputedRef, type Ref} from 'vue'

export function useFetch<T = unknown>(url: ComputedRef<string|null> | Ref<string|null>) {
  const data = ref<T|null>(null)
  const error = ref(null)

  const fetchData = () => {
    if (url.value !== null){
      fetch(url.value)
        .then((res) => res.json())
        .then((json) => {
          data.value = json
          error.value = null
        })
        .catch((err) => {
          data.value = null
          error.value = err
        })
    } else {
      data.value = null
      error.value = null
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
