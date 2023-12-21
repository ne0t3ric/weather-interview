import type {ComputedRef, Ref} from 'vue'
import {computed} from 'vue'
import {useFetch} from '@/composables/useFetch'
import type {GeocodingAPIQuery, GeocodingAPIResponse} from '@/apis/geocoding/GeocodingAPITypes'
import {HttpApi} from '@/apis/HttpApi'

const endpoint = '/api/geocoding/'
const httpApi = new HttpApi(window.location.origin)
httpApi.setEndpoint(endpoint)


export function useGeocodingAPI(searchText: ComputedRef<string>|Ref<string>) {
  const url = computed(() => {
    const query = buildGeocodingQuery(searchText.value)
    httpApi.setQuery(query)

    return httpApi.getStringUrl()
  })

  const { data, error } = useFetch<GeocodingAPIResponse>(url)

  return {
    data,
    error
  }
}

function buildGeocodingQuery(searchText: string): GeocodingAPIQuery{
  return {
    text: searchText
  }
}
