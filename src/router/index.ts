import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/HomeView.vue'),
    redirect:'/goods',
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
        path:'authority/:id/:authority',
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

//设置路由守卫
router.beforeEach((to,from,next)=>{
  const token:string | null = localStorage.getItem('token')
  //没登陆就转到登录页面
  if(!token && to.path !== '/login'){
    next('/login')
  }else{
    next()
  }
})

export default router
