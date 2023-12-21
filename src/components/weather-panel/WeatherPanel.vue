<template>
  <v-card
      class="mx-auto panel fill-height"
      :loading="loading"
  >
    <!--    <template #loader="{props}">-->
    <!--      <v-skeleton-loader type="card"></v-skeleton-loader>-->
    <!--    </template>-->
    <v-card-item title="Weather forecast for the next days">
      <template v-slot:subtitle>
        <v-icon
            icon="mdi-alert"
            size="18"
            color="error"
            class="me-1 pb-1"
        ></v-icon>

        {{ location?.label }}
      </template>
    </v-card-item>
    <v-list class="bg-transparent">
      <v-list-item
          v-for="[day, forecastsOfDay] in forecastsByDay"
          :key="day"
          :title="formatDay(day)"
      >
        <WeatherTable :forecasts="forecastsOfDay"></WeatherTable>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
import {computed, toRefs} from 'vue'
import {useWeatherAPI} from '@/apis/weather/useWeatherAPI'
import type {PointLocation} from '@/domain/PointLocation'
import type {WeatherForecast} from '@/domain/WeatherForecast'
import WeatherTable from '@/components/weather-panel/WeatherTable.vue'

const props = defineProps<{
  location: PointLocation | null
}>()

const {location} = toRefs(props)

// Get weather data based on matching LonLat
const locationLonLat = computed(() => {
  if (!location.value) {
    return null
  }
  return [location.value.lon, location.value.lat] as [number, number]
})

const {data, loading} = useWeatherAPI(locationLonLat)

// Reformat weather data to provide to panel
const forecasts = computed(() => {
  return data.value?.results.map(r => ({
    date: r.forecast,
    temperature: r.temperature
  })) || []
})

const forecastsByDay = computed(() => {
  let forecastsDayMap = new Map<string, WeatherForecast[]>()
  for (const forecast of forecasts.value) {
    // Date is in UTC
    const date = new Date(forecast.date)
    date.setHours(0, 0, 0, 0)
    const dayString = date.toISOString()

    let existingForecastsDay: WeatherForecast[] = [forecast]
    if (forecastsDayMap.has(dayString)) {
      existingForecastsDay = forecastsDayMap.get(dayString)!
      existingForecastsDay.push(forecast)
    }

    forecastsDayMap.set(dayString, existingForecastsDay)
  }

  return forecastsDayMap
})

function formatDay(day: string) {
  const formattedWeekday = new Date(day).toLocaleString('en-us', {weekday: 'long'})
  const formattedDay = new Date(day).toLocaleString('en-us', {day: '2-digit'})
  return `${formattedWeekday} ${formattedDay}`
}


</script>
<style scoped>
.panel {
  background-color: rgba(255, 255, 255, 0.15)
}
</style>
