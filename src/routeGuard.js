import Vue from 'vue'
import router from './router'
// import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  setDocumentTitle,
  domTitle
} from '@/utils/domUtil'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import nProgress from 'nprogress'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (to.path === '/user/login' && Vue.ls.get(ACCESS_TOKEN)) {
    next({
      path: '/dashboard/workplace'
    })
    NProgress.done()
  } else if (to.path !== '/user/login' && !Vue.ls.get(ACCESS_TOKEN)) {
    next({
      path: '/user/login'
    })
    NProgress.done()
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})