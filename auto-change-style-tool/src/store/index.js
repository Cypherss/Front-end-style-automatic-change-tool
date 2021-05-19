import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 0,
    userName: null
  },
  mutations: {
    login(state, payload){
      state.userId = payload;
    },
    fillName(state, payload){
      state.userName = payload;
    }
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
