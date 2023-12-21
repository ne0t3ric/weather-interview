<template>
  <div v-for="forecast in forecasts" :key="forecast.date">
    {{ forecast.date }}
    <span>{{ forecast.temperature }}</span>
  </div>
</template>
<script setup lang="ts">
import {computed, toRefs} from 'vue'
import {useWeatherAPI} from '@/apis/weather/useWeatherAPI'
import type {PointLocation} from '@/domain/PointLocation'

const props = defineProps<{
  location: PointLocation|null
}>()

const { location } = toRefs(props)

// Get weather data based on matching LonLat
const locationLonLat = computed(() => {
  if (!location.value){
    return null
  }
  return [location.value.lon, location.value.lat] as [number,number]
})

const {data} = useWeatherAPI(locationLonLat)

// Reformat weather data to provide to panel
const forecasts = computed(() => {
  return data.value?.results.map(r => ({
    date: r.forecast,
    temperature: r.temperature
  })) || []
})
</script>
