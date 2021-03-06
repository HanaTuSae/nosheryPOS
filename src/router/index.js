import Vue from 'vue'
import Router from 'vue-router'
// import Pos from '@/components/page/Pos.vue'

const Pos = () => import('@/components/page/Pos.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    }
  ]
})
