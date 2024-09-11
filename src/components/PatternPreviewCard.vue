<template>
  <v-card class="pa-2" elevation="12" density="compact">
    <v-card-title>
      {{ patternTitle }}
    </v-card-title>
    <v-card-subtitle
    v-if="pattern"
      style="text-overflow: unset; white-space: wrap; opacity: 1"
      >{{ pattern.shortDescription }}</v-card-subtitle
    >
    <v-divider style="opacity: 1" class="my-2"></v-divider>
    <v-card-subtitle
    v-if="pattern"
      style="text-overflow: unset; white-space: wrap; opacity: 1"
      >{{ pattern.longDescription }}</v-card-subtitle
    >
  </v-card>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{ patternTitle: string }>();
const pattern = computed(() => {
  return window.resources.patterns.find(
    (pattern) => pattern.title == props.patternTitle
  );
});
</script>
