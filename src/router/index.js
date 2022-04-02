import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
//配置路由,每写一个组组件只要是跳转都要配置如意欧
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        name: 'login',
        path: '/login',
        component: Login,

    },
    {
        name: 'home',
        path: '/',
        component: Home,
    }]
})