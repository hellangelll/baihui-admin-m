/**
 * Created by Rain
 * 2018/3/16.
 */

import {baseUrl, apiAxiosFun} from '@/api/index'

export default {
  login:function(params, callBack){
    // let url = baseUrl + '/api/mockData/login.php';
    let url = baseUrl + '/login';
    return apiAxiosFun(url, 'post', params, callBack);
  },
  getBusinessList:function(params, callBack){
    let url = baseUrl + '/trade/business/list';
    return apiAxiosFun(url,'get', params, callBack)
  },
  saveBusinessInfo:function(params, callBack){
    let url = baseUrl + '/trade/business/update';
    return apiAxiosFun(url,'post', params, callBack)
  },
  getOrderList:function(params, callBack){
    let url = baseUrl + '/trade/order/list';
    return apiAxiosFun(url,'get', params, callBack)
  },
  modifyOrderStatus:function(params, callBack){
    let url = baseUrl + '/trade/order/send';
    return apiAxiosFun(url,'post', params, callBack)
  },
  getGoodsList:function(params, callBack){
    let url = baseUrl + '/trade/goods/list';
    return apiAxiosFun(url,'get', params, callBack)
  },
  getCustomerList:function(params, callBack){
    let url = baseUrl + '/trade/customer/list';
    return apiAxiosFun(url,'get', params, callBack)
  },
  saveCustomerInfo:function(params, callBack){
    let url = baseUrl + '/trade/customer/update';
    return apiAxiosFun(url,'post', params, callBack)
  },
}



