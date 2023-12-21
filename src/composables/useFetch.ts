import {type ComputedRef, ref, type Ref, watchEffect} from 'vue'

export function useFetch<T = unknown>(url: ComputedRef<string | null> | Ref<string | null>) {
  const data = ref<T | null>(null)
  const error = ref(null)
  const loading = ref(false)
  let controller: AbortController | null = null;

  const fetchData = () => {
    if (url.value !== null) {
      controller = new AbortController();
      const signal = controller.signal
      loading.value = true
      fetch(url.value, {signal: signal})
        .then((res) => res.json())
        .then((json) => {
          data.value = json
          error.value = null
          loading.value = false
        })
        .catch((err) => {
          data.value = null
          error.value = err
          loading.value = false
        })
    } else {
      data.value = null
      error.value = null
      loading.value = false
    }
  }

  watchEffect(() => {
    controller?.abort()
    fetchData()
  })

  return {data, error, loading}
}
