import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import store from '@/vuex/store'


Vue.use(Router)

const router = new Router({
  store,
  routes: [
    {
      path: '/',
      redirect: 'home',
    },
    {
      path: '/home',
      name:'home',
      component: () => import('@/components/home'),
        meta: {
          title: "英华达"
        }
      
    },
    {
      path: '/Card',
      name: 'Card',
      component: () => import('@/components/Card/card'),
      meta: {
        title: "电子卡"
      }
    },
    {
      path: '/myCard',
      name: 'myCard',
      component: () => import('@/components/Card/myCard'),
      meta: {
        title: "电子卡"
      }

    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('@/components/recharge/recharge'),
      meta: {
        title: "电子卡充值"
      }
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/components/Menber/register'),
      meta: {
        title: "加入会员"
      }
    },
    {
      path: '/register/success',
      name: 'success',
      component: () => import('@/components/Menber/success'),
      meta: {
        title: "加入会员"
      }
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/components/Card/error'),
      meta: {
        title: "加入会员"
      }
    },
    {
      path: '/isMenber',
      name: 'isMenber',
      component: () => import('@/components/Menber/isMenber'),
      meta: {
        title: "加入会员"
      }
    },
    {
      path: '/isMenber/hyClause',
      name: 'hyClause',
      component: () => import('@/components/Menber/hyClause'),
      meta: {
        title: "《英华达会员条款》"
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: () => import('@/components/coupon/coupon'),
      meta: {
        title: "优惠券查看"
      }
    },
    {
      path: '/cardInfo',
      name: 'cardInfo',
      component: () => import('@/components/Card/components/cardInfo'),
      meta: {
        title: "会员卡说明"
      }
    },
    {
      path: '/levelInfo',
      name: 'levelInfo',
      component: () => import('@/components/Card/components/levelInfo'),
      meta: {
        title: "等级权益说明"
      }
    },
    {
      path: '/cardBinding',
      name: 'cardBinding',
      component: () => import('@/components/Card/components/cardBinding'),
      meta: {
        title: "实体卡绑定"
      }
    },
    
  ]

})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  let isMenber = false; // true / false是否会员

  if (to.name === 'register') {
    console.log(isMenber);
    if (isMenber) {
      router.push({
        name: 'isMenber'
      });
    }else{
      next();
    }
  }

  next();
});


export default router