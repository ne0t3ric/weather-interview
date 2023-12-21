import {ref, watchEffect, type ComputedRef, type Ref} from 'vue'

export function useFetch<T = unknown>(url: ComputedRef<string|null> | Ref<string|null>) {
  const data = ref<T|null>(null)
  const error = ref(null)
  let controller: AbortController | null = null;

  const fetchData = () => {
    if (url.value !== null){
      controller = new AbortController();
      const signal = controller.signal

      fetch(url.value, { signal: signal})
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
    controller?.abort()
    fetchData()
  })

  return { data, error }
}
