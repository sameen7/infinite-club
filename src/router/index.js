import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import create from '@/components/create'
import event from '@/components/event'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/event/:id',
      name: 'event',
      component: event
    }
  ]
})
