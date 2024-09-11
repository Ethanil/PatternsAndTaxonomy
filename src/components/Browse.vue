<template>
  <v-card>
          <v-navigation-drawer permanent>
            <template #prepend>Choose Action Verb to Filter Patterns</template>
            <v-list selectable mandatory open-strategy="single" v-model:selected="chosenActionverb">
            <v-list-item :value="-1"  active-class="active-item">All</v-list-item>
            <template v-for="(verbsArray, category) in categorizedActionVerbs">
              <v-list-group :value="category">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" :title="category"></v-list-item>
                </template>
                <template v-for="verbs of verbsArray">
                  <v-list-item :value="verbs.value"  active-class="active-item"><template v-for="verb in verbs.title"><span>{{ verb }}</span><br></template></v-list-item>
                </template>
              </v-list-group>
            </template>
          </v-list>
          </v-navigation-drawer>
          <v-container v-if="!chosenPattern" fluid>
            <v-row>
              <v-col 
              v-for="pattern in patterns"
              cols="3">
                <PatternPreviewCard :patternTitle="pattern.title" height="100%" @click="chosenPattern=pattern"></PatternPreviewCard>
              </v-col>
            </v-row>
          </v-container>
          <v-container v-else>
            <v-row><v-btn color="primary" @click="chosenPattern=null">back</v-btn></v-row>
            <v-row>
              <PatternCard
                :pattern="chosenPattern"
                @linkClicked="handleLinkClick"
              ></PatternCard>
            </v-row>            
          </v-container>
          
          <!-- <v-container>
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="chosenPattern"
                :items="patterns"
                auto-select-first
                return-object
                density="compact"
                transition="fade-transition"
                bg-color="primary"
                clearable
              >
                <template #item="{ props }">
                  <v-list-item v-bind="props" density="compact"></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <PatternCard
                v-if="chosenPattern"
                :pattern="chosenPattern"
                @linkClicked="handleLinkClick"
              ></PatternCard>
            </v-col>
          </v-row>
    </v-container> -->
  </v-card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import PatternCard from "./PatternCard.vue";
import PatternPreviewCard from './PatternPreviewCard.vue';
const chosenActionverb = defineModel("chosenActionverb", {default:[-1]});
const categorizedActionVerbs = window.resources.categorizedActionVerbs as {
  [key: string]: string[][];
};
const patterns = computed(() => {
  return window.resources.patterns.filter((pattern) => {
  if(chosenActionverb.value[0]===-1) return true;
  return Object.entries(pattern.actionVerbs)[chosenActionverb.value[0]][1];
})});
const chosenPattern = defineModel("chosenPattern");
const handleLinkClick = function (targetName) {
  chosenPattern.value = (patterns.value as { title: string }[]).find(
    (pattern) => pattern["title"] && pattern.title === targetName
  );
  window.scrollTo(0, 0);
};
</script>
<style>
.active-item{
  background-color: rgb(162, 204, 190);
}
</style>