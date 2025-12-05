import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    permissions: []
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_PERMISSIONS(state, permissions) {
      state.permissions = permissions
    }
  },

  actions: {
    async login({ commit }, credentials) {
      // 登录逻辑
      console.log('Login:', credentials)
    },

    async logout({ commit }) {
      commit('SET_USER', null)
      commit('SET_PERMISSIONS', [])
    }
  },

  getters: {
    isLoggedIn: state => !!state.user,
    hasPermission: state => permission => {
      return state.permissions.includes(permission)
    }
  }
})
