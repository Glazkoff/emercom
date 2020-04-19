import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user-token") || "",
    status: ""
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = "loading";
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = "success";
      state.token = token;
    },
    AUTH_ERROR: state => {
      state.status = "error";
    },
    AUTH_LOGOUT: state => {
      state.token = "";
      state.status = "";
    }
  },
  actions: {
    AUTH_REQUEST(context, user) {
      return new Promise((resolve, reject) => {
        // Promise используется для редиректа при входе в систему
        context.commit("AUTH_REQUEST");
        axios({
            url: "auth",
            data: user,
            method: "POST"
          })
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem("user-token", token); // сохранить токен в localstorage
            context.commit("AUTH_SUCCESS", token);
            context.dispatch("USER_REQUEST");
            resolve(resp);
          })
          .catch(err => {
            context.commit("AUTH_ERROR", err);
            localStorage.removeItem("user-token"); // если запрос ошибочен, удаление токена в localstorage при возможности
            reject(err);
          });
      });
    },
    AUTH_LOGOUT: context => {
      return new Promise((resolve) => {
        context.commit("AUTH_LOGOUT");
        localStorage.removeItem("user-token"); // удаляем токен из localstorage
        // remove the axios default header
        delete axios.defaults.headers.common['Authorization']
        resolve();
      });
    }
  },
  modules: {}
});