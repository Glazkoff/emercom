import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user-token") || "",
    status: "",
    session: "",
    role: ""
  },
  getters: {
    // Логическое значение - авторизован или нет
    isAuthenticated: state => !!state.token,
    // Статус авторизации
    authStatus: state => state.status
  },
  mutations: {
    // Изменение состояния на "Загрузка"
    AUTH_REQUEST: state => {
      state.status = "loading";
    },
    // Изменение состояния на "Успех"
    AUTH_SUCCESS: (state, token) => {
      state.status = "success";
      state.token = token;
    },
    // Изменение состояния на "Ошибка"
    AUTH_ERROR: state => {
      state.status = "error";
    },
    // Выход из учётной записи
    AUTH_LOGOUT: state => {
      state.token = "";
      state.status = "";
    }
  },
  actions: {
    // POST запрос к API
    POST(url, data) {
      try {
        axios({
          url: "http://localhost:8080/api/" + url,
          data: data,
          method: "POST"
        }).then(
          resp => {
            console.log("POST response: ", resp);
          },
          error => {
            // вторая функция - запустится при вызове reject
            console.log("Rejected: " + error);
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.response);
              console.log(`Ошибка сервера ${error.response.status} при ответе`);
            } else if (error.request) {
              console.log(`Ошибка сервера ${error.request.status} при запросе`);
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    // Запрос авторизации, возвращает promise
    AUTH_REQUEST(context, user) {
      let prom;
      try {
        prom = new Promise(function(resolve, reject) {
          // Promise используется для редиректа при входе в систему
          context.commit("AUTH_REQUEST");
          axios({
            url: "http://localhost:8080/api/login",
            data: user,
            method: "POST"
          })
            .then(
              resp => {
                console.log(resp.data);
                const token = resp.data.token;
                localStorage.setItem("user-token", token); // сохранить токен в localstorage
                localStorage.setItem("department-id", resp.data.department_id); // сохранить ID отдела в localstorage
                localStorage.setItem("fio", resp.data.fio); // сохранить ФИО в localstorage
                localStorage.setItem("user-id", resp.data.user_id); // сохранить UserID в localstorage
                context.commit("AUTH_SUCCESS", token);
                resolve(resp);
              },
              error => {
                // вторая функция - запустится при вызове reject
                console.log("Rejected: " + error);
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                  console.log(error.response);
                  console.log(
                    `Ошибка сервера ${error.response.status} при ответе`
                  );
                } else if (error.request) {
                  console.log(
                    `Ошибка сервера ${error.request.status} при запросе`
                  );
                  console.log(error.request);
                } else {
                  console.log("Error", error.message);
                }
                console.log(error.config);
                context.commit("AUTH_ERROR");
                localStorage.removeItem("user-token"); // если запрос ошибочен, удаление токена в localstorage при возможности
                reject(error);
              }
            )
            .catch(error => {
              console.log("ОШИБКА СЕРВЕРА");
              console.log(error);
            });
        });
        return prom;
      } catch (e) {
        console.log(e);
      }
    },
    // Удаление всех данных при выходе из учётной записи
    AUTH_LOGOUT: context => {
      return new Promise(resolve => {
        context.commit("AUTH_LOGOUT");
        localStorage.removeItem("user-token"); // удаляем токен из localstorage
        localStorage.removeItem("department-id"); // удаляем ID отдела из localstorage
        localStorage.removeItem("fio"); // удаляем ФИО из localstorage
        localStorage.removeItem("user-id"); // удаляем UserID из localstorage
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  modules: {}
});
