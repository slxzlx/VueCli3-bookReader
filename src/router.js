import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index'),
      children: [{
        path: ':bookName',
        component: resolve => require(['cps/ebook/ebookReader'],resolve)
      }]
    },
    {
      path:'/shelf',
      component: resolve => require(['./views/shelf/index'],resolve)
    },
    {
      path:'/recommend',
      component:resolve => require(['./views/recommend/index'],resolve)
    },
    {
      path:'/classify',
      component:resolve => require(['./views/classify/index'],resolve)
    },
  ],
  mode:'history'
})
