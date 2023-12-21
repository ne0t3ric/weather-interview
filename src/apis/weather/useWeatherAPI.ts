import type {ComputedRef, Ref} from 'vue'
import {computed, toValue} from 'vue'
import {useFetch} from '@/composables/useFetch'
import type {WeatherAPILat, WeatherAPILon, WeatherAPIRequest, WeatherAPIResponse} from '@/apis/weather/WeatherAPITypes'
import {HttpApi} from '@/apis/HttpApi'

const endpoint = '/api/weather/'
const apikey = 'df11f2adaed1f4b4804da3a57704d9720cb5b067dabd2e6c1072e1d9'
const httpApi = new HttpApi(window.location.origin)
httpApi.setEndpoint(endpoint)

export function useWeatherAPI(lonLat: ComputedRef<[WeatherAPILon, WeatherAPILat]|null>|Ref<[WeatherAPILon, WeatherAPILat]|null>) {
  const url = computed(() => {
    if (lonLat.value === null){
      return null
    }

    const query = buildWeatherQuery(lonLat.value)
    httpApi.setQuery(query)

    return httpApi.getStringUrl()
  })

  const { data, error } = useFetch<WeatherAPIResponse>(url)

  return {
    data,
    error
  }
}

function buildWeatherQuery(lonLat: [WeatherAPILon, WeatherAPILat]): WeatherAPIRequest['query']{
  return {
    where: buildBboxParam(lonLat),
    'order-by': 'forecast',
    limit: '100',
    // apikey: apikey
  }
}
function buildBboxParam(lonLat: [WeatherAPILon, WeatherAPILat]){
  const precision = 0.5
  const centerLon = lonLat[0]
  const centerLat = lonLat[1]
  const cornerBottomLeft = [centerLon - precision/2, centerLat - precision/2]
  const cornerUpRight = [centerLon + precision/2, centerLat + precision/2]
  return `in_bbox(position, ${cornerBottomLeft[1]}, ${cornerBottomLeft[0]}, ${cornerUpRight[1]}, ${cornerUpRight[0]})`
}
