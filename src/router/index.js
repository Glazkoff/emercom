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
import store from '../store/index'


Vue.use(VueRouter);

// Для перехода в компонент Entrance
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
  } else {
    next('/');
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
    beforeEnter: ifAuthenticated
  },
  {
    path: '/attached',
    name: "Attached",
    component: AttachedRequests,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/toattach',
    name: 'ToAttach',
    component: ToAttach,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/useredit',
    name: "UserEdit",
    component: UserEdit,
    beforeEnter: ifAuthenticated
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