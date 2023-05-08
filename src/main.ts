import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./pinia";
import timeTool from "./plugins/timeTool";
//element样式
import "element-plus/dist/index.css";
//element夜间主题样式
import "element-plus/theme-chalk/dark/css-vars.css";
import "./styles/main.css";
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(timeTool);
app.mount("#app");
