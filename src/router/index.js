import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'userLogin',
    component: () => import('../views/email/login.vue')
  },
  {
    path: '/writeEmail',
    name: 'writeEmail',
    component: () => import('../views/email/writeEmail.vue')
  },
  {
    path: '/viewDetail',
    name: 'viewDetail',
    component: () => import('../views/email/viewDetail.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
