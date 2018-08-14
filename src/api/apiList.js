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
  }
}



