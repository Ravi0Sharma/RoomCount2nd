import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './views/Homepage.vue'
import RegisterPage from './views/RegisterPage.vue'
import LoginPage from './views/LoginPage.vue'


const routes = [
  { path: '/RegisterPage', name: 'RegisterPage', component: RegisterPage, meta: { hideNavbar: true } },
  { path: '/', name: 'LoginPage', component: LoginPage, meta: { hideNavbar: true } },
  { path: '/Homepage', name: 'Homepage', component: HomePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
