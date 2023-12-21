<template>
  <div v-for="forecast in forecasts" :key="forecast.date">
    {{ forecast.date }}
    <span>{{ forecast.temperature }}</span>
  </div>
</template>
<script setup lang="ts">
import type {WeatherForecast} from '@/domain/WeatherForecast'

defineProps<{
  pointName: string
  forecasts: WeatherForecast[]
}>()
</script>
