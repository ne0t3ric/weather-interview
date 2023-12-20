import type {ComputedRef, Ref} from 'vue'
import {computed} from 'vue'
import {useFetch} from '@/composables/useFetch'
import type {GeocodingAPIResult} from '@/apis/geocoding/GeocodingAPITypes'

const baseUrl = 'http://pelias.smappen.com:4000/v1/search'

export function useGeocodingAPI(search: ComputedRef<string>|Ref<string>) {
  const url = computed(() => {
    const jsURL = new URL(baseUrl)
    jsURL.searchParams.set('text', search.value)

    return jsURL.toString()
  })

  const { data, error } = useFetch<GeocodingAPIResult>(url)

  return {
    data,
    error
  }
}
