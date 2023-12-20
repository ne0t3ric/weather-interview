<template>
  <input v-model="address" type="text">
</template>
<script setup lang="ts">
import {ref, watch} from 'vue'
import {useGeocodingAPI} from '@/apis/geocoding/useGeocodingAPI'
const address = ref('')
const { data, error } = useGeocodingAPI(address)

watch(data, () => console.warn(data))
</script>
