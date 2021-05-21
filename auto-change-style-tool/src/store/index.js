import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
    userId: 0,
    userName: null,
    snackbar1: false,
  },
  mutations: {
    login(state, payload){
      state.userId = payload;
      state.snackbar1 = true;
    },
    fillName(state, payload){
      state.userName = payload;
    },
  },
  actions: {
    refresh(context) {
      context.commit('login', 0);
      context.commit('fillName', null);
    }
  },
  modules: {
  }
})
