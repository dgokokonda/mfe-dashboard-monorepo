import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import { getSharedPinia } from "@mfe-dashboard/shared-stores";

const app = createApp(App);
const pinia = getSharedPinia();

app.use(pinia);
app.use(router);
app.mount("#app");

export { app, pinia, router };
