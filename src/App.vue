<template>
  <div id="app">
    <AdminPanel></AdminPanel>
    <router-view />
  </div>
</template>
<script>
// import axios from "axios";
import AdminPanel from "@/components/AdminPanel.vue";
export default {
  components: {
    AdminPanel,
  },
  methods: {},
  created() {
    const token = localStorage.getItem("user-token");
    if (token) {
      this.$http.defaults.headers.common["Authorization"] = token;
    }
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.response) {
          // alert(err.response.data);
        }
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // Если ошибка авторизации на сервере, выкинуть пользователя
          this.$store.dispatch("AUTH_LOGOUT");
          this.$router.push("/login");
        }
        throw err;
      });
    });
    if (!token && this.$route.path !== "/login") {
      this.$router.push("/login");
    }
  },
};
</script>
<style>
@font-face {
  font-family: "Montserrat Regular";
  src: url("assets/Montserrat-Regular.ttf");
}

@font-face {
  font-family: "Montserrat Medium";
  src: url("assets/Montserrat-Medium.ttf");
}

@font-face {
  font-family: "Montserrat Medium";
  src: url("assets/Montserrat-Medium.ttf");
}
@font-face {
  font-family: "Montserrat SemiBoldItalic";
  src: url("assets/Montserrat-SemiBoldItalic.ttf");
}
@font-face {
  font-family: "Montserrat SemiBoldItalic";
  src: url("assets/Montserrat-SemiBoldItalic.ttf");
}
@font-face {
  font-family: "Montserrat Bold";
  src: url("assets/Montserrat-Bold.ttf");
}

body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat Regular";
  overflow: hidden;
}
#admin-panel {
  height: 30px;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  font-family: "Montserrat Regular";
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
}
#admin-panel * {
  display: block;
  max-height: 30px;
  margin: 5px 10px;
  margin-right: 15px;
}
.split-screen-wrapper {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  max-height: 100vh;
  min-height: calc(100vh - 30px);
}
.split-screen-half {
  background-color: #e5e5e5;
  width: 50vw;
  display: flex;
}
.split-screen-half:nth-child(2) {
  background-color: #a8a8a8;
}
.centered-wrapper {
  margin: auto auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
}
</style>
