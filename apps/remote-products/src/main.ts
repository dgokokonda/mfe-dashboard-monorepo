export const version = "1.0.0";

import { createApp } from "vue";
import App from "./App.vue";
import { getSharedPinia } from "@mfe-dashboard/shared-stores";

const app = createApp(App);
const pinia = getSharedPinia();
app.use(pinia);
app.mount("#app");
