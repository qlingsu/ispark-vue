import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/page',
    name: 'homePage',
    // route level code-splitting
    // this generates a separate chunk (Home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    children:[
      {
        path: 'student',
        name: 'student',
        component: () => import(/* webpackChunkName: "student" */ '../views/student.vue')
      },
      {
        path: 'coach',
        name: 'coach',
        component: () => import(/* webpackChunkName: "coach" */ '../views/coach.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
