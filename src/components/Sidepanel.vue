<template>
  <div id="side-panel" :class="{ 'side-panel-open': menuOpen }">
    <button class="switch-btn" @click="switchMenu()">Меню</button>
    <div class="logo">
      <div class="logo-img"></div>
      <router-link tag="h1" class="logo-title" to="/"
        >Система заявок<br />в IT-отдел</router-link
      >
    </div>
    <div class="nav-wrapper">
      <div class="link-wrapper">
        <router-link to="/" class="nav-link" exact
          ><span class="nav-logo home"></span><span>Главная</span></router-link
        >
        <div class="white-spacer"></div>
      </div>
      <div class="link-wrapper">
        <router-link to="write" class="nav-link "
          ><span class="nav-logo pen"></span
          ><span>Написать<br />заявку</span></router-link
        >
        <div class="white-spacer"></div>
      </div>
      <div class="link-wrapper">
        <router-link to="list" class="nav-link"
          ><span class="nav-logo list"></span
          ><span>Ваши заявки</span></router-link
        >
        <div class="white-spacer"></div>
      </div>
      <div class="link-wrapper">
        <router-link to="history" class="nav-link"
          ><span class="nav-logo time"></span
          ><span>История<br />оповещений</span></router-link
        >
        <div class="white-spacer"></div>
      </div>
      <div class="link-wrapper" v-if="isEmployee || isAdmin">
        <router-link to="NewMessage" class="nav-link"
          ><span class="nav-logo chat"></span
          ><span>Добавить<br />оповещение</span></router-link
        >
        <div class="white-spacer"></div>
      </div>
      <div class="link-wrapper" v-if="isEmployee || isAdmin">
        <router-link to="attached" class="nav-link"
          ><span class="nav-logo list"></span
          ><span>Прикреплённые заявки</span></router-link
        >
        <div class="white-spacer"></div>
      </div>
      <div class="link-wrapper" v-if="isEmployee || isAdmin">
        <router-link to="toattach" class="nav-link"
          ><span class="nav-logo list"></span
          ><span>Прикрепить заявку</span></router-link
        >
        <div class="white-spacer"></div>
      </div>
      <div class="link-wrapper" v-if="isAdmin">
        <router-link to="useredit" class="nav-link"
          ><span class="nav-logo list"></span
          ><span>Редактирование пользователей</span></router-link
        >
        <div class="white-spacer"></div>
      </div>
    </div>
    <div class="link-wrapper">
      <button @click="logout()" class="logout-btn"><span>Выйти</span></button>
    </div>
  </div>
</template>

<script>
import JWT from "jwt-client";
export default {
  name: "Sidepanel",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    // Метод выхода из учётной записи
    logout() {
      // Возвращает promise
      this.$store.dispatch("AUTH_LOGOUT").then(() => {
        this.$router.push("/login");
      });
    },
    switchMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
  computed: {
    // Вычисленное логическое свойство - администратор или нет
    isAdmin() {
      let token = this.$store.state.token;
      if (token) {
        let data = JWT.read(token);
        return data.claim.role === "admin";
      } else {
        return false;
      }
    },
    // Вычисленное логическое свойство - сотрудник IT-отдела или нет
    isEmployee() {
      let token = this.$store.state.token;
      if (token) {
        let data = JWT.read(token);
        return data.claim.role === "employee";
      } else {
        return false;
      }
    },
    // Вычисленное логическое свойство - ответственный за ТО или нет
    isResponsible() {
      let token = this.$store.state.token;
      if (token) {
        let data = JWT.read(token);
        return data.claim.role === "responsible";
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
#side-panel .logo {
  margin-left: 0.8rem;
  margin-top: 0.8rem;
  height: 60px;
}
#side-panel .logo-img {
  width: 40px;
  height: 40px;
}
#side-panel .logo-title {
  font-size: 1.1rem;
  cursor: pointer;
  color: #fff;
}
.nav-wrapper {
  height: calc(100vh - 1.6rem - 60px - 7.5rem);
  overflow-y: auto;
  padding-top: 60px;
  direction: rtl;
}
.nav-wrapper > * {
  direction: ltr;
}
.nav-link,
.logout-btn {
  display: block;
  display: flex;
  align-content: center;
  padding: 20px;
  box-sizing: border-box;
  border-top-left-radius: calc(2.2rem);
  border-bottom-left-radius: calc(2.2rem);
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  margin-left: 10px;
  position: relative;
  text-decoration: none;
  outline: none;
}
.logout-btn {
  z-index: 1000;
  border: none;
  font-family: "Montserrat Medium";
  background-color: transparent;
  display: block;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid #d2dae6;
  color: #d2dae6;
  border-radius: 0;
  margin-left: 0;
  font-size: 0.9rem;
}
.nav-link.router-link-active {
  background-color: #fff;
  outline: none;
  box-shadow: inset 1px 0px 1px rgba(0, 0, 0, 0.3);
}
a.nav-link.router-link-active span {
  color: #000;
}
#side-panel {
  height: 100vh;
}
#side-panel,
.nav-link.router-link-active::before,
.nav-link.router-link-active::after {
  background-color: #0c2461;
}
.nav-link.router-link-active::before,
.nav-link.router-link-active::after {
  display: block;
  content: "";
  border-radius: 30px;
  height: calc(100%);
  width: 60px;
  position: absolute;
  right: -0px;
  top: calc(-100%);
  z-index: 100;
}
.nav-link.router-link-active::after {
  top: calc(100%);
}
a.nav-link,
a.nav-link:visited,
a.nav-link:hover,
a.nav-link:active {
  color: #e4e7ec;
}
.nav-link span {
  z-index: 200;
}
.link-wrapper {
  position: relative;
}
.nav-link.router-link-active + .white-spacer {
  height: calc(100% + 60px);
  width: 30px;
  position: absolute;
  background-color: #fff;
  z-index: 50;
  right: 0;
  top: calc(-30px);
}
.nav-logo {
  display: inline-block;
  width: 2ch;
  height: 2ch;
  margin-right: 10px;
  margin: auto 10px;
  filter: invert(100%);
}
.home {
  background: url("../assets/home.svg") no-repeat;
  background-size: contain;
}
.pen {
  background: url("../assets/pen.svg") no-repeat;
  background-size: contain;
}
.nav-link.router-link-active > span.nav-logo {
  filter: grayscale(100%) brightness(-500%);
}
.time {
  background: url("../assets/time.svg") no-repeat;
  background-size: contain;
}
.list {
  background: url("../assets/list.svg") no-repeat;
  background-size: contain;
}
.chat {
  background: url("../assets/chat.svg") no-repeat;
  background-size: contain;
}
.cross {
  background: url("../assets/cross.svg") no-repeat;
  background-size: contain;
  height: 16px;
  margin-left: 0px;
}
.nav-link * {
  display: block;
}
</style>
