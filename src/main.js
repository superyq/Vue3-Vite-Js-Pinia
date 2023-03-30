import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.js";
// 引入css
import "./assets/style/index.scss";
// svg 组件
import GiSvgIcon from "@/components/SvgIcon.vue";
import "virtual:svg-icons-register";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component("svg-icon", GiSvgIcon);
app.mount("#app");
