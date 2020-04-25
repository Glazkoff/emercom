<template>
  <div id="side-panel">
    <div class="logo">
      <div class="logo-img"></div>
      <router-link tag="h1" class="logo-title" to="main"
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
      <div class="link-wrapper">
        <router-link to="chat" class="nav-link"
          ><span class="nav-logo chat"></span
          ><span>Чат с<br />IT-специалистом</span></router-link
        >
        <div class="white-spacer"></div>
      </div>
      <div class="link-wrapper">
        <!-- <router-link exact="true" to="/" class="nav-link"
          ><span class="nav-logo "></span><span>Выйти</span></router-link
        >
        <div class="white-spacer"></div> -->
        <button @click="logout()" class="logout-btn"><span>Выйти</span></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidepanel",
  methods: {
    logout() {
      this.$store.dispatch("AUTH_LOGOUT").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
#side-panel {
  background-color: #8b8b8b;
  height: 100%;
}
#side-panel .logo {
  margin-left: 0.8rem;
  margin-top: 0.8rem;
  margin-bottom: 60px;
}
#side-panel .logo-img {
  width: 40px;
  height: 40px;
}
#side-panel .logo-title {
  font-size: 1.1rem;
  cursor: pointer;
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
}
.logout-btn {
  border: none;
  font-family: "Montserrat Medium";
  background-color: transparent;
  display: block;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0;
  margin-left: 0;
  margin-top: 2rem;
  font-size: 0.9rem;
}
.nav-link.router-link-active {
  background-color: #fff;
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
  background-color: #8b8b8b;
}
.nav-link.router-link-active::after {
  top: calc(100%);
}
.nav-link:visited {
  color: #000;
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
}
.home {
  background: url("../assets/home.svg") no-repeat;
  background-size: contain;
}
.pen {
  background: url("../assets/pen.svg") no-repeat;
  background-size: contain;
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
