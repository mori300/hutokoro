import Vue from 'vue'
import VueRouter from 'vue-router'
import Balance from '../views/Balance.vue'
import FixedCost from '../views/FixedCost.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import firebase from '/firebase/firestore.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Balance',
    component: Balance,
    meta: { requiresAuth: true }
  },
  {
    path: '/fixedcost',
    name: 'FixedCost',
    component: FixedCost,
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requires = to.matched.some(record => record.meta.requires)
  if(requires) {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        next()
      } else {
        next(
          {
            path: '/signin',
            query: { redirect: to.fullPath}
          }
        )
      }
    })
  } else {
    next()
  }
})

export default router
