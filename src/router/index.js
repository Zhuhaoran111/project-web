import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
//配置路由,每写一个组组件只要是跳转都要配置如意欧
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/right.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        name: 'login',
        path: '/login',
        component: Login,

    },
    {
        /* 问题：这里的path为什么是/????????? */
        name: 'home',
        path: '/',
        component: Home,
        /* 这里配置在home出现之后，users */
        children: [
            { name: 'users', path: 'users', component: Users },
            {
                /*配置路由前面的/表示什么  加/表示根路径下访问，不加/表示相对路径下访问*/
                name: 'right',
                path: '/rights',
                component: Rights
            }
        ]
    }]
})