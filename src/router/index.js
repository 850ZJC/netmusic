import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //首页默认展示main/find页面
  {//导航页
    path: '/',
    name: 'main',
    component: ()=>import('@/pages/nav/index'),
    redirect:'/find',
    children:[
     {
        path:'/home',
        component:()=>import('@/pages/home/index.vue')
      },
      {
        path:'/find',
        component:()=>import('@/pages/find/index.vue')
      },
      {
        path:'/friend',
        component:()=>import('@/pages/friend/friend.vue')
      },
      // {
      //   path:'/videoPage',
      //   component:()=>import('@/pages/videoIndex.vue')
      // },
    ]
  },
  //===========登录页面
  {//登录
    path:'/login',
    component:()=>import('@/pages/login/index'),

  },      
  {//手机号码
    path:'/login/phone',
    component:()=>import('@/pages/login/phoneAccount')
  },
  {//密码
    path:'/login/pwd',
    component:()=>import('@/pages/login/phonePwd')
  },
  {//验证码
    path:'/login/verify',
    component:()=>import('@/pages/login/phoneVerify')
  },
  {//歌单广场
    path:'/playlist',
    component:()=>import('@/pages/playList/index'),
    redirect:'/playlist/recommend',
    children:[
      {//精品
        path:'/playlist/highquality',
        component:()=>import('@/pages/playList/highQuality')
      },
      {//通用
        path:'/playlist/general/:id',
        component:()=>import('@/pages/playList/general')
      },
      {//推荐歌单
        path:'/playlist/recommend',
        component:()=>import('@/pages/playList/recommend')
      },
    ],
  },
  {//歌单详情
    name:'playListDetail',
    path:'/playlist/detail',
    component:()=>import('@/pages/playListDetail/index')

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
