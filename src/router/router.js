import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home/Slide.vue'
import signup from '../components/auth/signup.vue'
import login from '../components/auth/signin.vue'
import MyRequsts from '../components/requsts/requst.vue'
import newRequst from '../components/requsts/creatRequst.vue' 
import AuthGuard from './auth-guard'
import about from "../components/Shared/About.vue"
Vue.use(VueRouter)

export default new VueRouter({
    routes:[{
            path: '/',
            component: Home
        },
    
        {
            path: '/login',
            name: 'Login',
            component: login
        }, {
            path: '/signup',
            name: 'Signup',
            component: signup
        },
             {
            path: '/myreq',
            name: 'MyRequsts',
            component: MyRequsts,
                beforeEnter: AuthGuard
        },
            {
                path:'/newRequst',
                name:'NewRequst',
                component:newRequst,
                beforeEnter: AuthGuard
            },
            {
                path:"/about",
                name:"AboutUs",
                component:about,
            }

    ],
    mode: 'history',
})

