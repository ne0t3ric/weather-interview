<template>
  <v-autocomplete
      placeholder="Search a location..."
      :auto-select-first="true"
      v-model="location"
      v-model:focused="focus"
      @update:search="searchLocations"
      :no-filter="true"
      :hide-no-data="true"
      :items="filteredLocations"
      item-title="label"
      :return-object="true">
  </v-autocomplete>
</template>
<script setup lang="ts">
import {computed, ref, watchEffect} from 'vue'
import {useGeocodingAPI} from '@/apis/geocoding/useGeocodingAPI'
import type {PointLocation} from '@/domain/PointLocation'


const props = defineProps<{
  modelValue: PointLocation | null
}>()
const emits = defineEmits(['update:modelValue'])

// proxy v-model
const location = computed({
  get: () => {
    return props.modelValue
  },
  set: (value: PointLocation | null) => {
    emits('update:modelValue', value)
  }
})

// The search text entered by the client through the input
const locationSearchText = ref('')
const focus = ref(false)

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
  // Prevent research if search = current location. Happens when focus on vuetify autocomplete that has already a value
  const isDifferentSearch = location.value !== null ? location.value.label !== searchText : true
  if (!isDifferentSearch) {
    return
  }

  // Prevent input to be deleted on unfocus
  if (searchText === '' && location.value !== null && !focus.value) {
    return
  }

  locationSearchText.value = searchText
}

// React to locationSearchText change
watchEffect(() => {
  location.value = defaultPoint.value
})
</script>
