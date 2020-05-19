import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    // Do something with response error
    if (error.response.status === 401) {
      console.log("unauthorized, logging out ...");
      localStorage.removeItem("user-token");
      router.push("login");
    }
    return Promise.reject(error.response);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
