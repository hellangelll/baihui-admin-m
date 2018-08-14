/**
 * Created by Rain
 * 2018/3/15.
 */
import Axios from 'axios'
import { Indicator, Toast} from 'mint-ui'



const baseUrl = 'https://test.bhsht.com'
const doubanUrl = 'https://api.douban.com/v2'


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
  return response;
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
    params: params
  }).then(function(res){

    callBack(res)

  }).catch(function(err){

    throw err;

  })
}

export {baseUrl, apiAxiosFun, Axios}




