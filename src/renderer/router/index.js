import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: (resolve) => require(['@/components/recommend/recommend'], resolve),
      children: [
        {
          path: '',
          redirect: 'my-radio-station'
        },
        {
          path: 'my-radio-station',
          component: (resolve) => require(['@/components/radio-station/radio-station'], resolve)
        },
        {
          path: 'singers',
          component: (resolve) => require(['@/components/singers/singers'], resolve)
        },
        {
          path: 'top',
          component: (resolve) => require(['@/components/top/top'], resolve)
        },
        {
          path: 'new-disc',
          component: (resolve) => require(['@/components/new-disc/new-disc'], resolve)
        }
      ]
    },
    {
      path: '/my-favorite',
      component: (resolve) => require(['@/components/my-favorite/my-favorite'], resolve)
    },
    {
      path: '/search-result/:keyword',
      component: (resolve) => require(['@/components/search-result/search-result'], resolve)
    }
  ]
})
