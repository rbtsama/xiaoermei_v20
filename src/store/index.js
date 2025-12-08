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
    /**
     * 用户登录
     * @param commit - Vuex commit 函数
     * @param credentials - 登录凭证 {username, password}
     */
    async login({ commit }, credentials) {
      // TODO: 接入真实登录API
      // const user = await loginAPI(credentials)
      // commit('SET_USER', user)
      // commit('SET_PERMISSIONS', user.permissions)
    },

    /**
     * 用户登出
     * 清除用户信息和权限
     */
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
