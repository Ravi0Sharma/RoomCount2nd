import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './views/HomePage.vue'
import Register from './views/register.vue'
import Login from './views/login.vue'


const routes = [
  { path: '/Register', name: 'Register', component: Register, meta: { hideNavbar: true } },
  { path: '/', name: 'Login', component: Login, meta: { hideNavbar: true } },
  { path: '/HomePage', name: 'HomePage', component: HomePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
