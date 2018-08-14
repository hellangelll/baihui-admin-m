// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import Vuex from 'vuex'
import Store from './store'

//引入Axios插件
import Axios from 'axios'
//import Apis from './api/index'
import Apis from './api/apiList'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

//引入Mint-Ui库及其CSS
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
//引入图片预览插件
import VuePicturePreview from 'vue-picture-preview'



//将Axios注册到Vue的全局
Vue.prototype.Axios = Axios
Vue.prototype.$apis = Apis

Vue.use(Vuex)
Vue.use(VuePicturePreview)

//MintUi相关组件配置
Vue.use(Mint,{
  lazyload: {
    preLoad: 1.3,
    error: '../../static/images/book_03.png',
    loading: '../../static/images/loading.gif',
    attempt: 1

  }
})

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:Router,
  store:Store,
  components: { App },
  template: '<App/>',
  created(){
    /*this.$toast({
      message: '欢迎，欢迎！',
      position: 'top',
      iconClass: 'fa fa-flag',
      duration:5000
    })*/

  },
  mounted(){

  }

})
