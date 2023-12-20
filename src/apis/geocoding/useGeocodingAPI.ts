import type {ComputedRef, Ref} from 'vue'
import {computed} from 'vue'
import {useFetch} from '@/composables/useFetch'
import type {GeocodingAPIResult} from '@/apis/geocoding/GeocodingAPITypes'

const endpoint = '/api/geocoding/'

export function useGeocodingAPI(search: ComputedRef<string>|Ref<string>) {
  const url = computed(() => {
    const jsURL = new URL(endpoint, window.location.origin)
    jsURL.searchParams.set('text', search.value)

    return jsURL.toString()
  })

  const { data, error } = useFetch<GeocodingAPIResult>(url)

  return {
    data,
    error
  }
}
