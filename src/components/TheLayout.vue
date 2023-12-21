<template>
  <v-app>
    <v-main class="d-flex justify-center">
      <v-container :fluid="true">
        <v-row>
          <v-col>
            <LocationSelect v-model="location"></LocationSelect>
          </v-col>
        </v-row>
        <v-row class="d-flex align-center justify-center"
        >
          <v-col
              xs="12"
              sm="9"
              md="6"
          >
            <WeatherPanel :location="location"></WeatherPanel>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import type {PointLocation} from '@/domain/PointLocation'
import LocationSelect from '@/components/LocationSelect.vue'
import WeatherPanel from '@/components/weather-panel/WeatherPanel.vue'

const location = ref<PointLocation | null>(null)

</script>
