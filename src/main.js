import Vue from "vue";
import "./firebase";
import App from "./app.vue";

window.eventHub = new Vue();

new Vue({
  el: "#app",
  render: h => h(App)
});
