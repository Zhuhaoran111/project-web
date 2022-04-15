import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
//配置路由,每写一个组组件只要是跳转都要配置如意欧
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import { apply } from 'file-loader'

/* 下面是引入element中的提示信息 */
import { Message } from 'element-ui';

Vue.use(Router)

const router = new Router({
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
            },
            { name: 'roles', path: '/roles', component: Role },
        ]
    }]
})



//在路由配置生效前 统一判断token
//路由守卫在路由配置生效之前
//路由(导航)守卫--------------------------不熟悉
router.beforeEach((to, from, next) => {
    //to是要去的路由配置，from是当前的路由配置
    console.log(to, from);

    if (to.path === '/login') {
        next();
    } else {
        const token = localStorage.getItem('token')
        if (!token) {
            Message.warning('回到登录页')
            router.push({
                name: 'login'
            })
            return
        }
        next()
    }
    //如果要去的是登陆——>判断token值
    //如果token没有——>登陆
    //如果token有——>next


    //让当前的路由配置生效，
    next()
})

export default router

//node 中间件
// app.use((req, res, next) => {
    //req.body
    //res.render()
    //next()   会自动调用下一个中间件
//     res.send()
//     next()
// })