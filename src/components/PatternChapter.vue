<template>
  <v-card-text>
    <h2>{{ title }}</h2>
    <p v-for="row in rows">
      <template v-for="element in row">
        <template v-if="typeof element != 'string'">
          <template v-if="element.type === 'link'">
            <v-tooltip width="25%" open-delay="250" content-class="my-tooltip">
              <template #activator="{ props }">
                <a
                  v-bind="props"
                  href="text.targetName"
                  @click.stop.prevent="emit('linkClicked', element.targetName)"
                >
                  {{ element.text }}
                </a>
              </template>
              <PatternPreviewCard
                :patternTitle="element.targetName as string"
              ></PatternPreviewCard>
            </v-tooltip>
          </template>

          <component :is="element.name">{{ element.text }}</component>
        </template>
        <span v-else>{{ element }} </span>
      </template>
    </p>
  </v-card-text>
</template>
<script setup lang="ts">
import { Row } from "./PatternCard.vue";
import PatternPreviewCard from "./PatternPreviewCard.vue";
const props = defineProps<{ title: string; rows: { [key: string]: Row } }>();
const emit = defineEmits(["linkClicked"]);
</script>
<style>
.my-tooltip{
    background-color: transparent !important;
}
</style>