import axios from "axios";
let BASEURL
if(process.env.NODE_ENV==="development"){
    BASEURL='/api'
}
else if(process.env.NODE_ENV==="test"){
    BASEURL='http://8.134.73.52:80/api'
    // BASEURL = 'http://127.0.0.1:5001/api'
}
else if(process.env.NODE_ENV==="production"){
    BASEURL='http://8.134.73.52:80/api'
}
const instance = axios.create({
    baseURL: BASEURL,
    timeout: 100000,
    withCredentials: true
});
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
/*         const token = localStorage.getItem('_id')
        console.log('token',token)
        if (localStorage.getItem('_id')) {
            // 注意：config.method 的判断值必须是小写的post和get
            if (config.method === 'post') {
                config.data = {
                    api_token: token,
                    ...config.data
                }
            } else if (config.method === 'get') {
                config.params = {
                    api_token: token,
                    ...config.params
                }
            }
        }
 */       
        let headers = config.headers
        headers.userId = localStorage.getItem('_id') ? localStorage.getItem('_id') : ''
        console.log('请求拦截器',config);
        return config;
    },
    function (error) {

        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        console.log('响应拦截器',response);
        // 对响应数据做点什么
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;

