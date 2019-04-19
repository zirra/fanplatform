import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Roster from '@/components/screens/Roster'
import Schedule from '@/components/screens/Schedule'
import Shop from '@/components/screens/Shop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/roster',
      name: 'Roster',
      component: Roster
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    }
  ]
})
