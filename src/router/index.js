import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import BookmarkList from '../components/Bookmark/BookmarkList.vue'
import BookmarkGraph from '../components/Graph/BookmarkGraph.vue'
import Search from '../components/GitHub/Search.vue'
import Utility from '@/utility/index'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:
    '/login',
    name: 'Login',
    component: Login
  },
  {
    path:
    '/register',
    name: 'Register',
    component: Register
  },
  {
    path:
    '/bookmarks',
    name: 'BookmarkList',
    component: BookmarkList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:
    '/graph',
    name: 'BookmarkGraph',
    component: BookmarkGraph,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:
    '/search',
    name: 'Search',
    component: Search,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeResolve((to, from, next) => {
  const redirect = {
    name: 'Home'
  }
  if (!to.matched.length || to.matched.some(record => record.meta.requiresAuth)) {
    const token = Utility.decryptSessionDetails('token', false)
    const tokenParsed = Utility.parseJwt(token)
    if (Object.keys(store.state.user).length === 0 && !Object.keys(tokenParsed).length) {
      if (to.matched.length && to.fullPath !== '/') {
        store.state.redirectURL = to.fullPath
      }
      redirect.name = 'Login'
      next(redirect)
    }
  }
  next()
})

export default router
