import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './views/Homepage.vue'
import RegisterPage from './views/RegisterPage.vue'
import LoginPage from './views/LoginPage.vue'
import SessionHistory from './views/SessionHistory.vue'


const routes = [
  { path: '/RegisterPage', name: 'RegisterPage', component: RegisterPage, meta: { hideNavbar: true } },
  { path: '/', name: 'LoginPage', component: LoginPage, meta: { hideNavbar: true } },
  { path: '/Homepage', name: 'Homepage', component: HomePage },
  { path: "/SessionHistory", name: 'SessionHistory', component: SessionHistory}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
