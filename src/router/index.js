import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import Register from '@/components/register/register'
import Forget from '@/components/forget/forget'
// import Index from '@/components/index/index'
import My from '@/components/my/my'
import Essays from '@/components/essays/essays'
import Drabs from '@/components/drabs/drabs'
import Detail from '@/components/detail/detail'
import Business from '@/components/business/business'
import ShowBusinessDetail from '@/components/business/showBusinessDetail'
import ModifyBusinessDetail from '@/components/business/modifyBusinessDetail'

Vue.use(Router)


const myRouter = new Router({
  //mode:'history',
  routes: [
    // {
    //   path: '/index',
    //   name: 'Index',
    //   alias: '/',
    //   meta:{requiredAuth:true},
    //   component: Index
    // },
    {
      path: '/business',
      name: 'Business',
      alias: '/',
      meta:{requiredAuth:true},
      component: Business
    },
    {
      path: '/showBusinessDetail',
      name: 'ShowBusinessDetail',
      meta:{requiredAuth:true},
      component: ShowBusinessDetail
    },
    {
      path: '/modifyBusinessDetail',
      name: 'ModifyBusinessDetail',
      meta:{requiredAuth:true},
      component: ModifyBusinessDetail
    },
    {
      path: '/my',
      name: 'My',
      meta:{requiredAuth:true},
      component: My
    },
    {
      path: '/essays',
      name: 'Essays',
      component: Essays
    },
    {
      path: '/drabs',
      name: 'Drabs',
      meta:{requiredAuth:true},
      component: Drabs
    },
    {
      path: '/detail',
      name: 'Detail',
      meta:{requiredAuth:true},
      component: Detail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    }
  ]
});

//全局守卫钩子
myRouter.beforeEach( function(to, from, next){
  let loginStatus = localStorage.getItem("userInfo") ? true : false;
  //array.some(function(param){ return param>10})
  //record,可以随意取名，代表数组中的每个元素
  if(to.matched.some(record => record.meta.requiredAuth)){
    if(!loginStatus){
      next({
        path:'/login',
        query: { redirect: to.fullPath }
      })
    }else{
      next();
    }
  }else{
    next();
  }

})

export default myRouter;
