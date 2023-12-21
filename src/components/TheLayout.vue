<template>
  <LocationSelect v-model="location"></LocationSelect>
  <WeatherPanel :location="location"></WeatherPanel>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import type {PointLocation} from '@/domain/PointLocation'
import LocationSelect from '@/components/LocationSelect.vue'
import WeatherPanel from '@/components/WeatherPanel.vue'

const location = ref<PointLocation|null>(null)

</script>
