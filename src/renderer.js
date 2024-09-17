import { createApp } from "vue";
// Vuetify
import "vuetify/styles";
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from 'pinia';

import App from "./App.vue";
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});
createApp(App).use(vuetify).use(pinia).mount("#app");
