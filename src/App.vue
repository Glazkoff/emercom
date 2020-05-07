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
  font-family: "Montserrat Light";
  src: url("assets/Montserrat-Light.ttf");
}
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

.split-screen-wrapper {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1fr;
  width: 100vw;
  max-height: 100vh;
  min-height: calc(100vh - 30px);
}
.split-screen-half {
  background-color: #e5e5e5;
  /* width: 50vw; */
  display: flex;
}
.split-screen-half:nth-child(2) {
  background-color: #d4d4d4;
}
.centered-wrapper {
  margin: auto auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
}
button.deleteBtn {
  outline: none;
  user-select: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  color: rgba(0, 0, 0, 0.9);
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  line-height: 2rem;
  padding: 0;
  box-sizing: border-box;
  transition: 0.1s;
}
button:hover.deleteBtn {
  background-color: transparent;
  box-shadow: none;
  transform: rotate(90deg) scale(1.3);
}
button:active.deleteBtn {
  background-color: transparent;
  box-shadow: none;
}
::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-thumb {
  border-width: 1px 1px 1px 2px;
  border-color: #777;
  background-color: #aaa;
  border-radius: 8px;
  cursor: pointer;
}
::-webkit-scrollbar-thumb:hover {
  border-width: 1px 1px 1px 2px;
  border-color: #555;
  background-color: #777;
}
::-webkit-scrollbar-track {
  border-width: 0;
}
::-webkit-scrollbar-track:hover {
  border-left: solid 1px #aaa;
  background-color: #eee;
}
.input-form .radio-point {
  display: flex;
  /* height: 40px; */
  /* margin-right: ; */
}
.input-form .radio-point input[type="radio"] {
  display: none;
}
.input-form .radio-point input[type="radio"],
.input-form .radio-point label {
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.input-form .radio-point label {
  padding: 1rem;
  border: 1px solid rgb(117, 117, 117);
}
.input-form .radio-point label:not(:first-child) {
}
.input-form .radio-point input:checked + label {
  background-color: #0855ad;
  color: #fff;
  display: flex;
  /* border: 1px solid #000; */
  border: none;
  /* font-weight: bold; */
}
.input-form .radio-group {
  display: block;
  display: flex;
}
.loading-box {
  width: 100%;
  display: flex;
  /* height: 20vh; */
}
.loading-box > * {
  margin: 10vh auto;
}
.modal-wrap {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
}
.outer {
  margin: auto auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  padding: 2rem;
  padding-top: 2.5rem;
  padding-bottom: 1rem;
  padding-right: 3rem;
  max-width: 50vw;
  min-width: 40vw;
  /* height: 50vh; */
  max-height: 70vh;
  background-color: #fff;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
}
.relative {
  /* position: relative; */
}
.inner {
  width: 100%;
  height: 50vh;
  padding-right: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
}
.inner p {
  margin: 0.5rem;
}
.inner h2 {
  margin-top: 0.8rem;
}
.inner h4 {
  margin-top: 0.8rem;
  margin-bottom: 0;
}
.outer .deleteBtn {
  top: 12px;
  right: 12px;
  position: absolute;
  display: block;
}
/* .outer > *:not(.deleteBtn) {
  width: 100%;
  margin: 0;
  margin-bottom: 0.5rem;
}
.outer > h1,
.outer > p {
  display: block;
} */
.modal-btn-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}
.modal-btn-wrap button {
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  width: 100%;
  cursor: pointer;
  font-family: "Montserrat Medium";
  color: #fff;
  background-color: #c44536;
  border-radius: 4px;
  text-transform: uppercase;
  outline: none;
}
.modal-btn-wrap button:hover {
  box-shadow: 0px 2px 8px #a73b2f;
}
</style>
