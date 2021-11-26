/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import Qs from 'qs';
// 创建axios实例
const request = axios.create({
    timeout: 10000,
    baseURL: process.env.VUE_APP_API
});
// 设置post请求头
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/** 
 * 请求拦截器   
 * 每次请求前，如果存在token则在请求头中携带token 
 */
request.interceptors.request.use(
    config => {

        if (config.method === 'post') {
            const contentType = config.headers['Content-Type'];
            if (contentType) {
                if (contentType.includes('json')) {//检测是否包含json
                    config.data = JSON.stringify(config.data)//将 JavaScript 值转换为 JSON 字符串
                } else {
                    config.data = Qs.stringify(config.data)
                }
            }
        }
        return config;
    },
    error => Promise.error(error))

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 处理返回体
        const result = response.data
        const code = Number(result.code)
        /**
         * Desc: 接口请求业务异常统一处理
         */
        if (code === 201) {
            alert('您已退出登录')
        } else {
            if (result.code && result.code !== '200') {
                console.log(result.message)
            }
            return result
        }
    },  // HTTP Code异常统一处理
)


export default request;

