<template>
  <v-row>
    <v-col v-for="suggestion in suggestions" :key="suggestion.label" class="d-flex justify-center align-center mb-4">
      <v-btn color="transparent" @click="setLocation(suggestion)">{{ suggestion.label }}</v-btn>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import type {PointLocation} from '@/domain/PointLocation'

defineProps<{
  modelValue: PointLocation | null
}>()

const emits = defineEmits(['update:modelValue'])
const suggestions = [
  {'label': 'Toulouse, France', 'lon': 1.440694, 'lat': 43.603902},
  {'label': 'Paris, France', 'lon': 2.342865, 'lat': 48.858705},
  {'label': 'Lyon, France', 'lon': 4.835571, 'lat': 45.732398},
  {'label': 'Phnom Penh, Cambodge', 'lon': 104.91601, 'lat': 11.56245}
]


function setLocation(suggestion: PointLocation) {
  emits('update:modelValue', suggestion)
}
</script>
