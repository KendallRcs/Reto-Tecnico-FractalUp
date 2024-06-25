import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/second',
    name: 'second',
    component: () => import('../views/SecondView.vue')
  },
  {
    path: '/third',
    name: 'third',
    component: () => import('../views/ThirdView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
