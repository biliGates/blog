import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import MyFavorite from '@/components/my-favorite/my-favorite'

import MyRadioStation from '@/components/radio-station/radio-station'
import Singers from '@/components/singers/singers'
import Top from '@/components/top/top'
import NewDisc from '@/components/new-disc/new-disc'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: '',
          redirect: 'my-radio-station'
        },
        {
          path: 'my-radio-station',
          component: MyRadioStation
        },
        {
          path: 'singers',
          component: Singers
        },
        {
          path: 'top',
          component: Top
        },
        {
          path: 'new-disc',
          component: NewDisc
        }
      ]
    },
    {
      path: '/my-favorite',
      component: MyFavorite
    }
  ]
})
