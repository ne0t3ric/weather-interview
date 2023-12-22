import {type ComputedRef, ref, type Ref, type UnwrapRef, watchEffect} from 'vue'

export function useFetch<T = unknown>(url: ComputedRef<string | null> | Ref<string | null>) {
  const data = ref<T | null>(null)
  const error = ref<unknown>(null)
  const loading = ref(false)
  let controller: AbortController | null = null;

  function fetchData() {
    if (url.value !== null) {
      const signal = prepareCurrentFetch()

      loading.value = true

      fetch(url.value, {signal: signal})
        .then((res) => res.json())
        .then(onFetchSuccess)
        .catch(onFetchError)
    } else {
      resetState()
    }
  }

  function onFetchSuccess(json: UnwrapRef<T>) {
    data.value = json
    error.value = null
    loading.value = false
  }

  function onFetchError(err: unknown) {
    error.value = err
    resetState()
  }

  function resetState() {
    data.value = null
    loading.value = false
  }

  function prepareCurrentFetch() {
    controller = new AbortController();
    const signal = controller.signal

    return signal
  }

  function cancelCurrentFetch(controller: AbortController | null) {
    controller?.abort()
  }


  watchEffect(() => {
    cancelCurrentFetch(controller)
    fetchData()
  })

  return {data, error, loading}
}
