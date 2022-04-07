// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';

//引入插件
import MyServerHttp from '@/plugins/http.js';
import moment from 'moment'


//回顾axios
// import axios from 'axios'
// Vue.prototype.$http = axios

import 'element-ui/lib/theme-chalk/index.css';

//引入组件中公共的样式
import '@/assets/css/reset.css'
// import { HotModuleReplacementPlugin } from 'webpack';



//适用vue插件
Vue.use(ElementUI);
Vue.use(MyServerHttp);
//把不是vue第三件库axios变成Vue插件
// Vue.use(axios)

Vue.config.productionTip = false;

//全局过滤器(修改日期样式)
Vue.filter('fmtdate', (v) => {
    return moment(v).format('YYYY-MM--DD')
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})