import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import  Home from'@/components/Home'
import  Dishes from'@/components/dishes/Dishes'
import  Order from'@/components/Order'
import  Manage from'@/components/Manage'
import  About from'@/components/about/About'
import Login from '@/components/Login'
import Register from '@/components/Register'

import Intro from'@/components/about/Intro'
import Join from'@/components/about/Join'
import Contact from'@/components/about/Contact'
import HotDishes from "@/components/dishes/HotDishes"
import ColdDishes from "@/components/dishes/ColdDishes"
import Soup from "@/components/dishes/Soup"
import Drink from "@/components/dishes/Drink"
import Other from "@/components/dishes/Other"
//import DishesList from '@/components/dishes/DishesList'

import Wechat from'@/components/about/contact/Wechat'
import QQ from'@/components/about/contact/QQ'
import Email from'@/components/about/contact/Email'

export default new Router({
  routes:[
    {path:'/',component:Home},
    {
      path:'/dishes',
      component:Dishes,
      redirect:'/dishes/hotDishes',
      children:[
        {path:'/dishes/hotDishes',component:HotDishes},
        {path:'/dishes/coldDishes',component:ColdDishes},
        {path:'/dishes/soup',component:Soup},
        {path:'/dishes/drink',component:Drink},
        {path:'/dishes/other',component:Other},
      ]
      },
    {path:'/order',component:Order},



    {
      path:'/manage',
      component:Manage,
      // beforeEnter(to,from,next){
      //   alert('非登录状态下不能管理！');
      // }
      },
    {path:'/login',component:Login},
    {path:'/register',component:Register},

    {
      path:'/about',
      component:About,
      redirect:'/about/intro',
      children:[
        {path:'/about/intro',component:Intro},
        {path:'/about/join',component:Join},

        {path:'/about/contact',
        component:Contact,
        children:[
          {path:'/about/contact/qq',component:QQ},
          {path:'/about/contact/wechat',component:Wechat},
          {path:'/about/contact/email',component:Email},
        ]
        }
      ]
    },

  ]
})
