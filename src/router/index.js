import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Roster from '@/components/screens/Roster'
import Schedule from '@/components/screens/Schedule'
import SnapBack from '@/components/screens/SnapBack'
import SnapChat from '@/components/screens/SnapChat'

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
    },
    {
      path: '/snap',
      beforeEnter (to, from, next) { window.location.href = `${process.env.ROOT_API}v1/user/auth/snapchat` }
    },
    {
      path: '/snapback/:id',
      name: 'SnapBack',
      component: SnapBack
    },
    {
      path: '/snapchat',
      name: 'SnapChat',
      component: SnapChat
    }
  ]
})
