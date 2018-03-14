import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Login from '@/components/Login'
// import SignUp from '@/components/SignUp'
import Add from '@/components/Add'
import Edit from '@/components/Edit'
// import firebase from 'firebase'

import {dbAuth} from '../firebase/index'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/add',
      name: 'Add',
      component: Add,
      meta: {
        requiresAuth: true
      }
    },
      {
        path: '/edit/:id',
        name: 'Edit',
        props: true,
        component: Edit,
        meta: {
          requiresAuth: true
        }
      
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = dbAuth.currentUser;
  let requiresAuth = to.matched.some( record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next ('login')
  else if (!requiresAuth && currentUser) next ('hello')
  else next()
})


export default router

