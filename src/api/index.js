/**
 * Created by Rain
 * 2018/3/15.
 */
import Axios from 'axios'
import { Indicator, Toast} from 'mint-ui'
import Router from '../router'
import Store from '../store'

let baseUrl = '' //请求数据接口地址
if(window.location.hostname == 'm.admin.bhsht.com'||window.location.hostname == 'm.admin.test.bhsht.com'){
  baseUrl = '/apis'
}else{
  baseUrl = 'http://test.bhsht.com'
}

Axios.defaults.timeout = 1500

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'triple-bounce'
  });
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  Indicator.close();
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  Indicator.close();
  // 对响应数据做点什么
  if( response.data.code != 0){
    if(response.data.code == 403){
      Store.commit('updateLoginStatus', false)
      localStorage.setItem('userInfo','');
      Router.push({
        name:'Login'
      })
    }else{
      return response;
    }

  }else{
    return response;
  }
  
}, function (error) {

  // 对响应错误做点什么
  Indicator.close();
  return Promise.reject(error);
});

//封装axios请求
let apiAxiosFun =  function(url, method, params, callBack){
  Axios({
    url: url,
    method: method,
    params: params,
    //自定义的要被发送的头信息
    headers:{'X-Requested-with':'XMLHttpRequest'},
  }).then((res)=>{
    callBack(res)
  }).catch((err)=>{
    throw err;
  })
}

export {baseUrl, apiAxiosFun, Axios}
