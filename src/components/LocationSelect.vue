<template>
  <div class="wrapper" style="min-width: 500px">
    <v-autocomplete
        v-model="location"
        @update:search="searchLocations"
        :no-filter="true"
        :hide-no-data="true"
        :items="filteredLocations"
        item-title="label"
        :return-object="true">
    </v-autocomplete>
  </div>
</template>
<script setup lang="ts">
import {computed, ref, watchEffect} from 'vue'
import {useGeocodingAPI} from '@/apis/geocoding/useGeocodingAPI'
import type {PointLocation} from '@/domain/PointLocation'


const props = defineProps<{
  modelValue: PointLocation | null
}>()
const emits = defineEmits(['update:modelValue'])

const location = computed({
  get: () => {
    return props.modelValue
  },
  set: (value: PointLocation | null) => {
    emits('update:modelValue', value)
  }
})
// The address entered by the client through the input
const locationSearchText = ref('')

// Geocoding API
const geocodingAPI = useGeocodingAPI(locationSearchText)
const geocodingAPIResponse = geocodingAPI.data


// Show list of compatible locations for given searchText
const filteredLocations = computed(() => {
  return geocodingAPIResponse.value?.features.map(f => ({
    label: f.properties.label,
    lon: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1]
  })) || []
})

// Rule to define the defaultPoint when searchText changes. Default point = first entry of filteredLocations
const defaultPoint = computed(() => {
  if (filteredLocations.value.length === 0) {
    console.log('No address found')
    return null
  }

  return filteredLocations.value[0]
})

function searchLocations(searchText: string) {
  const emptySearch = searchText === ''
  if (emptySearch) {
    return
  }

  const isDifferentSearch = location.value !== null ? location.value.label !== searchText : true
  if (!isDifferentSearch) {
    return
  }

  locationSearchText.value = searchText
}

// React to selectedPoint change
watchEffect(() => {
  if (locationSearchText.value) {
    location.value = defaultPoint.value
  }
})
</script>
