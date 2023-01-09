import { createApp } from "vue";
import store from "@/store";
import router from "@/router";
import App from "@/App.vue";
import "./style.less";

createApp(App).use(store).use(router).mount("#app");
