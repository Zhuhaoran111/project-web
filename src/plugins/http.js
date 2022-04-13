//插件模块

import axios from 'axios'
const MyHttpServer = {}


MyHttpServer.install = (Vue) => {

    //基准url,这里有axios所以这里引入
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'


    /* 在请求发起之前，会先来下面的回调函数*/
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        console.log('拦截器被触发')
        console.log(config)
        /* 判断不是登陆标识就拦截，登陆不需要拦截 */
        if (config.url !== 'login') {
            const AUTH_TOKEN = localStorage.getItem("token");
            config.headers.common["Authorization"] = AUTH_TOKEN;
        }


        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });





    // 添加实例方法
    Vue.prototype.$http = axios
}

export default MyHttpServer
