import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/HomeView.vue'),
    children:[
      {
        path:'goods',
        name:'goods',
        meta:{
          isShow: true,
          title:'商品列表'
        },
        component:() => import(/* webpackChunkName: "Goods" */ '../views/GoodsView.vue'),
      },
      {
        path:'users',
        name:'users',
        meta:{
          isShow:true,
          title:'用户列表'
        },
        component:() => import(/* webpackChunkName: "Users" */ '../views/UserView.vue'),
      },
      {
        path:'role',
        name:'role',
        meta:{
          isShow:true,
          title:'角色列表'
        },
        component: () => import('../views/RoleView.vue')
      },
      {
        path:'authority',
        name:'authority',
        meta:{
          isShow:false,
          title:'权限列表'
        },
        component: () => import('../views/AuthorityView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
