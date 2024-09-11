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
    <v-card-text>
      <h3>Examples</h3>
      <p v-for="example in pattern.Examples">
        <template v-for="text in example">
          <template v-if="typeof text != 'string'">
            <a
              v-if="text.type === 'link'"
              href="text.targetName"
              @click.stop.prevent="emit('linkClicked', text.targetName)"
            >
              {{ text.text }}
            </a>
            <component v-else-if="text.type === 'header'" :is="text.name">
              {{ text.text }}
            </component>
          </template>
          <span v-else>{{ text }}</span>
        </template>
      </p>
    </v-card-text>
    <v-card-text>
      <h2>Using the pattern</h2>
      <p v-for="using in pattern.UsingThePattern">
        <template v-for="text in using">
          <template v-if="typeof text != 'string'">
            <a
              v-if="text.type === 'link'"
              href="text.targetName"
              @click.stop.prevent="emit('linkClicked', text.targetName)"
              >{{ text.text }}</a
            >
            <component :is="text.name">{{ text.text }}</component>
          </template>
          <span v-else>{{ text }}</span>
        </template>
      </p>
    </v-card-text>
    <v-card-text>
      <h2>Consequences</h2>
      <p v-for="consequence in pattern.Consequences">
        <template v-for="text in consequence">
          <template v-if="typeof text != 'string'">
            <a
              v-if="text.type === 'link'"
              href="text.targetName"
              @click.stop.prevent="emit('linkClicked', text.targetName)"
              >{{ text.text }}</a
            >
            <component :is="text.name">{{ text.text }}</component>
          </template>
          <span v-else>{{ text }}</span>
        </template>
      </p>
    </v-card-text>
    <v-card-text>
      <h2>Relations</h2>
      <p v-for="relation in pattern.Relations">
        <template v-for="text in relation">
          <template v-if="typeof text != 'string'">
            <a
              v-if="text.type === 'link'"
              href="text.targetName"
              @click.stop.prevent="emit('linkClicked', text.targetName)"
              >{{ text.text }}</a
            >
            <component :is="text.name">{{ text.text }}</component>
          </template>
          <span v-else>{{ text }}</span>
        </template>
      </p>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
type Element = {
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
type Row = {
  [key: string]: Element;
};
type Pattern = {
  title: string;
  shortDescription: string;
  longDescription: string;
  Examples: { [key: string]: Row };
  UsingThePattern: Row;
  Consequences: Row;
  Relations: Row;
  actionVerbs: {[key:string]: boolean;};
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
