<template>
  <v-main class="d-flex justify-center">
    <v-container
        :fluid="true"
        class="app-container d-flex flex-column"
    >
      <v-row
          :no-gutters="true"
          class='flex-grow-0'>
        <v-col>
          <LocationsSuggestions v-model="location"></LocationsSuggestions>
        </v-col>
      </v-row>
      <v-row
          :no-gutters="true"
          class='flex-grow-0'>
        <v-col>
          <LocationSelect v-model="location"></LocationSelect>
        </v-col>
      </v-row>
      <v-row
          :no-gutters="true"
          class="d-flex align-center justify-center"
      >
        <v-col
            xs="12"
            sm="9"
            md="6"
            class="fill-height"
        >
          <WeatherPanel :location="location"></WeatherPanel>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import type {PointLocation} from '@/domain/PointLocation'
import LocationSelect from '@/components/LocationSelect.vue'
import LocationsSuggestions from '@/components/LocationsSuggestions.vue'
import WeatherPanel from '@/components/WeatherPanel.vue'

const location = ref<PointLocation | null>(null)
</script>
<style scoped>
.app-container {
  background: #eee;
  background: linear-gradient(#ff9966, #9966ff) fixed;
}
</style>
