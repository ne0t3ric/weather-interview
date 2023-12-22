<template>
  <div class="wrapper">
    <table>
      <thead>
      <tr>
        <th class="date" v-for="forecast in forecasts" :key="forecast.date">
          {{ formatHours(forecast.date) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="temperature" v-for="forecast in forecasts" :key="forecast.date">
          {{ formatTemperature(forecast.temperature) }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type {WeatherForecast} from '@/domain/WeatherForecast'

defineProps<{
  forecasts: WeatherForecast[]
}>()

function formatHours(date: string) {
  return new Date(date).toLocaleString('en-US', {hour: 'numeric', hour12: true, timeZone: 'UTC'})
}

function formatTemperature(value: number) {
  return Math.round(value) + ' °C'
}
</script>
<style scoped>
table {
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: 100%;
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 1px;
  text-align: left;
}

th, td {
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 5px;
  text-align: center;
}

th {
  background-color: rgba(255, 255, 255, 0.2);
}

.temperature, .date {
  font-size: 0.75rem;
  line-height: 2rem;
  letter-spacing: 0.1666666667em;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
}

.date {
  font-weight: 700;
  letter-spacing: 0;
}
</style>
