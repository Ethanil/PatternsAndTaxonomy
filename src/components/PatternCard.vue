<template>
  <v-card>
    <v-card-title
      ><h1>{{ pattern.title }}</h1></v-card-title
    >
    <v-card-subtitle>{{ pattern.shortDescription }}</v-card-subtitle>
    <v-card-text>
      <v-table density="compact" class="action-verb-table">
        <thead>
          <tr>
            <template v-for="(value, verb) in pattern.actionVerbs">
              <th :style="value ? 'background:palegreen;' : ''">
                <div class="action-verb">
                  {{ verb }}
                </div>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr>
            <template v-for="(value, verb) in pattern.actionVerbs">
              <td :style="value ? 'background:palegreen;' : ''">
                <v-icon
                  v-if="value"
                  icon="mdi-check"
                  class="action-verb-icon"
                ></v-icon>
              </td>
            </template>
          </tr>
        </tbody>
      </v-table>
      {{ pattern.rawCSVRow[2] }}
    </v-card-text>
    <v-card-text>{{ pattern.longDescription }}</v-card-text>
    <PatternChapter title="Examples" :rows="pattern.Examples" @linkClicked="(target) => emit('linkClicked', target)"></PatternChapter>
    <PatternChapter title="Using the pattern" :rows="pattern.UsingThePattern" @linkClicked="(target) => emit('linkClicked', target)"></PatternChapter>
    <PatternChapter title="Consequences" :rows="pattern.Consequences" @linkClicked="(target) => emit('linkClicked', target)"></PatternChapter>
    <PatternChapter title="Relations" :rows="pattern.Relations" @linkClicked="(target) => emit('linkClicked', target)"></PatternChapter>
  </v-card>
</template>
<script setup lang="ts">
import PatternChapter from './PatternChapter.vue';

export type Element = {
  [key: string]:
    | string
    | {
        type: string;
        targetFile?: string;
        targetName?: string;
        name?: string;
        text: string;
      };
};
export type Row = {
  [key: string]: Element;
};
export type Pattern = {
  title: string;
  shortDescription: string;
  longDescription: string;
  Examples: { [key: string]: Row };
  UsingThePattern: { [key: string]: Row };
  Consequences: { [key: string]: Row };
  Relations: { [key: string]: Row };
  actionVerbs: { [key: string]: boolean };
  rawCSVRow: string[];
};
const props = defineProps<{ pattern: Pattern }>();
const emit = defineEmits(["linkClicked"]);
</script>
<style>
.action-verb-table table {
  border: 1px solid;
  width: auto !important;
}
.action-verb-table th {
  padding: 0 3px !important;
}
.action-verb-table th + th {
  border-left: 1px solid;
}
.action-verb-table td + td {
  border-left: 1px solid;
}
.action-verb {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  padding-top: 0.5rem;
}
.action-verb-icon {
  left: calc(50% - 10.5px);
}
</style>
