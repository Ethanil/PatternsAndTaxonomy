<template>
  <v-carousel
    v-model="currentPage"
    hide-delimiters
    show-arrows
    :continuous="false"
    height="calc(100vh - 64px - 32px)"
  >
  
    <v-carousel-item>
      <v-sheet height="100%" color="grey" tile class="text-h3 pa-12">
      Formulate your learning question and break it down into more atomic learning questions. <br>
      An atomic learning question only deals with exactly one topic and can't be broken down into more, simpler questions.
    </v-sheet> 
  </v-carousel-item>
    <v-carousel-item>
      <v-sheet height="100%" color="grey" tile class="pa-12">
      Assign an action verb category from bloom's taxonomy to each question:
      <v-list class="text-h7">
        <v-list-item v-for="[index, verb] of actionVerbs">{{ verb }}</v-list-item>
      </v-list>
    </v-sheet> 
  </v-carousel-item>
  </v-carousel>
</template>
<script setup lang="ts">
const currentPage = defineModel("currentPage", { type: Number, default: 0 });
const actionVerbs = window.resources.actionVerbs;
</script>
