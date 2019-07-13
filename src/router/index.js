import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Roster from '@/components/screens/Roster'
import Schedule from '@/components/screens/Schedule'
import SnapBack from '@/components/screens/SnapBack'
import SnapChat from '@/components/screens/SnapChat'
import Settings from '@/components/screens/Settings'
import Offer from '@/components/screens/Offer'
import Shop from '@/components/screens/Shop'

Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/offer',
      name: 'Offer',
      component: Offer
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/store',
      beforeEnter (to, from, next) { window.open('https://shop.chiefs.com/?_s=bm-chiefs-topnav-61118', '_blank') }
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
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/:id',
      name: 'AltMain',
      props: true,
      component: Main
    }
  ]
})
