import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-book/:bookId(\\d+)?',
    name: 'AddBookPage',
    // route level code-splitting
    // this generates a separate chunk (add-book-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "add-book-page" */ '../views/AddBookPage.vue')
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
