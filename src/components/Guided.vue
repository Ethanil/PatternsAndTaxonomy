<template>
  
      <v-sheet height="100%" color="grey" tile class="text-h6 pa-12">
      1. Formulate your learning question and break it down into more atomic learning questions. <br>
      An atomic learning question only deals with exactly one topic and can't be broken down into more, simpler questions.
    </v-sheet> 
      <v-sheet height="100%" color="grey" tile class="text-h6 pa-12">
      2. Assign an action verb category from bloom's taxonomy to each question:
    </v-sheet> 
      <v-list class="text-h7">
        <v-list-item v-for="[index, verb] of actionVerbs">{{ verb }}</v-list-item>
      </v-list>
</template>
<script setup lang="ts">
const actionVerbs = window.resources.actionVerbs;
</script>
