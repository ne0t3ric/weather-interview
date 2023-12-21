<template>
  <input v-model="address" type="text">
  <Forecast :forecasts="forecasts" :point-name="selectedPointName"></Forecast>
</template>
<script setup lang="ts">
import {computed, onUnmounted, ref, watch} from 'vue'
import Forecast from '@/components/Forecast.vue'
import {useGeocodingAPI} from '@/apis/geocoding/useGeocodingAPI'
import type {GeocodingAPIFeaturePoint} from '@/apis/geocoding/GeocodingAPITypes'
import {useWeatherAPI} from '@/apis/weather/useWeatherAPI'

const address = ref('')
const geocodingAPI = useGeocodingAPI(address)
const geocodingAPIResponse = geocodingAPI.data
const defaultPoint = computed(() => {
  if (!geocodingAPIResponse.value || geocodingAPIResponse.value.features.length === 0){
    console.log('No address found')
    return null
  }

  return geocodingAPIResponse.value.features[0]
})
// TODO: selectable point among list
const selectedPoint = computed(() => defaultPoint.value)
const selectedPointName = computed(() => selectedPoint.value?.property.label || '')
const selectedPointLonLat = computed(() => {
  if (!selectedPoint.value) return null
  return selectedPoint.value.geometry.coordinates
})
const weatherAPI = useWeatherAPI(selectedPointLonLat)
const weatherData = weatherAPI.data
const forecasts = computed(() => {
  return weatherData.value?.results.map(r => ({
    date: r.forecast,
    temperature: r.temperature
  })) || []
})
</script>
