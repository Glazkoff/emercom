/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Entrance from "../views/Entrance.vue";
import Main from "../views/Main.vue";
import List from "../components/List.vue";
import NewMessage from "../components/NewMessage.vue";
import History from "../components/History.vue";
import Write from "../components/Write.vue";
import AttachedRequests from "../components/AttachedRequests.vue";
import ToAttach from "../components/ToAttach.vue";
import UserEdit from "../components/UserEdit.vue";
import store from "../store/index";
import JWT from "jwt-client";

Vue.use(VueRouter);

// Для перехода в компонент Entrance
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
  } else {
    next("/");
  }
};

// Для перехода в защищённые компоненты
const ifAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    console.log(`Пользователь неавторизован. Закрыт роут "${to.path}"`);
    // next('login');
  } else {
    next();
  }
};

// Для перехода в компоненты администратора
const ifAdmin = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    console.log(`Пользователь неавторизован. Закрыт роут "${to.path}"`);
    next("login");
  } else {
    let token = store.state.token;
    let data = JWT.read(token);
    if (data.claim.role === "admin") {
      next();
    } else {
      next("/");
    }
  }
};

// Для перехода в компоненты администратора или специалиста IT-отдела
const ifAdminOrEmployee = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    console.log(`Пользователь неавторизован. Закрыт роут "${to.path}"`);
    next("login");
  } else {
    let token = store.state.token;
    let data = JWT.read(token);
    if ((data.claim.role === "admin") || (data.claim.role === "employee")) {
      next();
    } else {
      next("/");
    }
  }
};

const routes = [{
    path: "/login",
    name: "Entrance",
    component: Entrance,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/",
    name: "Main",
    component: Main,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/write",
    name: "Write",
    component: Write,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/list",
    name: "List",
    component: List,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/history",
    name: "History",
    component: History,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/newmessage",
    name: "NewMessage",
    component: NewMessage,
    beforeEnter: ifAdminOrEmployee
  },
  {
    path: "/attached",
    name: "Attached",
    component: AttachedRequests,
    beforeEnter: ifAdminOrEmployee
  },
  {
    path: "/toattach",
    name: "ToAttach",
    component: ToAttach,
    beforeEnter: ifAdminOrEmployee
  },
  {
    path: "/useredit",
    name: "UserEdit",
    component: UserEdit,
    beforeEnter: ifAdmin
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;