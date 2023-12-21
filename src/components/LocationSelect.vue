<template>
  <input v-model="locationSearchText" type="text">
</template>
<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useGeocodingAPI} from '@/apis/geocoding/useGeocodingAPI'
import type {PointLocation} from '@/domain/PointLocation'

const props = defineProps<{
  modelValue: PointLocation|null
}>()
const emits = defineEmits(['update:modelValue'])

const location = computed({
  get: () => {
    return props.modelValue
  },
  set: (value: PointLocation|null) => {
    emits('update:modelValue', value)
  }
})
// The address entered by the client through the input
const locationSearchText = ref('')

// Geocoding API
const geocodingAPI = useGeocodingAPI(locationSearchText)
const geocodingAPIResponse = geocodingAPI.data

// Rule to define the defaultPoint when address changes. Default point = first entry of geocoding response
const defaultPoint = computed(() => {
  if (!geocodingAPIResponse.value || geocodingAPIResponse.value.features.length === 0){
    console.log('No address found')
    return null
  }

  return geocodingAPIResponse.value.features[0]
})
// TODO: selectable point among list
// Selected point by the client + derived props. For now it's just the defaultPoint
const selectedPoint = computed(() => defaultPoint.value)

// React to selectedPoint change
watch(() => selectedPoint.value, () => {
  if (!selectedPoint.value){
    location.value = null
    return
  }

  location.value = {
    label: selectedPoint.value.properties.label || '',
    lon: selectedPoint.value.geometry.coordinates[0],
    lat: selectedPoint.value.geometry.coordinates[1],
  }
})
</script>
