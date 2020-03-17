
import axios from 'axios';
import qs from 'qs';


// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config;
    }, 
    function (error) {
        console.error(error)
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

//response拦截器
axios.interceptors.response.use(
    response => {
        let data = response.data;
        console.log(data)
        if(data && data.code === "401"){//代表需要登录
            goLogin();
        }
        // else if(data && data.code === "authorize_error"){
        //     goDenied();
        // }
        else{
            return response;
        }
    },
    error => {
        console.error(error);
        return Promise.reject(error);
    }
);



//返回登录的方法
function goLogin(){
    window.location.hash = "#/login";
}
//去往没有权限页面
function goDenied(){
    window.location.hash = "#/denied";
}
// 封装获取 cookie 的方法
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}
export default {
    /**
     * 封装get方法
     * @param url
     * @param data
     * @returns {Promise}
     */
    get(url, params = {}) {
        return axios.get(url, {
            withCredentials:true,
            params: params
        });
    },


    /**
     * 封装post请求
     * @param url
     * @param params
     * @returns {Promise}
     */
    post(url, params = {},opts) {
        let option = Object.assign({
            withCredentials:true,
            headers:{
                'x-csrf-token': getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
            }
        },opts);
        return axios.post(url, qs.stringify(params),option)
    },

    /**
     * 封装post请求
     * @param url
     * @param params
     * @returns {Promise}
     */
    postDownload(url, params = {},opts) {
        let option = Object.assign({
            withCredentials:true
        },opts);
        return axios({
            method: 'post',
            url: url,
            data:qs.stringify(params),
            option:option,
            responseType: 'blob'
        });
    },

    /*
    上传函数
    */
    upload(url, fdata) {
        let option = {
            withCredentials:true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return axios.post(url, fdata,option)
    }
}
