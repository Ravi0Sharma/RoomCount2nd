import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './views/Homepage.vue'
import Register from './views/register.vue'
import Login from './views/Login.vue'


const routes = [
  { path: '/Register', name: 'Register', component: Register, meta: { hideNavbar: true } },
  { path: '/', name: 'Login', component: Login, meta: { hideNavbar: true } },
  { path: '/Homepage', name: 'Homepage', component: HomePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
