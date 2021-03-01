import Vue from 'vue'
import VueRouter from 'vue-router'
import Balance from '../views/Balance.vue'
import FixedCost from '../views/FixedCost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Balance',
    component: Balance
  },
  {
    path: '/fixedcost',
    name: 'FixedCost',
    component: FixedCost
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
