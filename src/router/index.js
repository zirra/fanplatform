import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Roster from '@/components/screens/Roster'
import Schedule from '@/components/screens/Schedule'

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
      beforeEnter (to, from, next) { window.open('https://sugar-land-skeeters10.mybigcommerce.com/', '_blank') }
    }
  ]
})
