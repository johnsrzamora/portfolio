import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d89bd486 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _552bd2a0 = () => interopDefault(import('..\\pages\\Contact.vue' /* webpackChunkName: "pages/Contact" */))
const _e2201e08 = () => interopDefault(import('..\\pages\\Intro.vue' /* webpackChunkName: "pages/Intro" */))
const _145705d8 = () => interopDefault(import('..\\pages\\Portfolio.vue' /* webpackChunkName: "pages/Portfolio" */))
const _ac8e962c = () => interopDefault(import('..\\pages\\PostService.js' /* webpackChunkName: "pages/PostService" */))
const _c5eda9dc = () => interopDefault(import('..\\pages\\Works.vue' /* webpackChunkName: "pages/Works" */))
const _992c1efc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _d89bd486,
    name: "about"
  }, {
    path: "/Contact",
    component: _552bd2a0,
    name: "Contact"
  }, {
    path: "/Intro",
    component: _e2201e08,
    name: "Intro"
  }, {
    path: "/Portfolio",
    component: _145705d8,
    name: "Portfolio"
  }, {
    path: "/PostService",
    component: _ac8e962c,
    name: "PostService"
  }, {
    path: "/Works",
    component: _c5eda9dc,
    name: "Works"
  }, {
    path: "/",
    component: _992c1efc,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
