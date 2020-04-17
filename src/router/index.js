import Vue from 'vue'
import VueRouter from 'vue-router'
import Entrance from '../views/Entrance.vue'
import Main from '../views/Main.vue'
import List from '../components/List.vue'
import Chat from '../components/Chat.vue'
import History from '../components/History.vue'
import Write from '../components/Write.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Entrance',
    component: Entrance
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/write',
    name: 'Write',
    component: Write
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
