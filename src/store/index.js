import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  loginStatus:false,
  userInfo: {}

}

const mutations = {
  updateLoginStatus(state, value){
    state.loginStatus = value;
  },
  updateUserInfo(state, loginUserInfo){
    state.userInfo = loginUserInfo;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
