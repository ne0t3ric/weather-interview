import type {ComputedRef, Ref} from 'vue'
import {computed} from 'vue'
import {useFetch} from '@/composables/useFetch'
import type {GeocodingAPIResponse} from '@/apis/geocoding/GeocodingAPITypes'

const endpoint = '/api/geocoding/'

export function useGeocodingAPI(textSearch: ComputedRef<string>|Ref<string>) {
  const url = computed(() => {
    const jsURL = new URL(endpoint, window.location.origin)
    jsURL.searchParams.set('text', textSearch.value)

    return jsURL.toString()
  })

  const { data, error } = useFetch<GeocodingAPIResponse>(url)

  return {
    data,
    error
  }
}
