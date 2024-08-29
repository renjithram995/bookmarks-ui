import { createStore } from 'vuex'
import Utility from '../utility'

// Vue.use(Vuex)

export default createStore({
  state: {
    user: {},
    token: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      state.token = token
    },
    logout (state) {
      state.user = null
      state.token = null
    },
    setOnLocalStorage (state, keyValue) {
      if (Object.keys(keyValue).length) {
        Object.entries(keyValue).forEach(([key, value]) => {
          Utility.encryptAndStoreSessionDetails(key, value, false)
        })
      }
    }
  },
  actions: {
    login ({ commit }, { user, token }) {
      commit('setUser', user)
      commit('setToken', token)
      commit('setOnLocalStorage', {
        token,
        credential: JSON.stringify(user)
      })
    },
    logout ({ commit }) {
      commit('logout')
      commit('setOnLocalStorage', {
        token: '',
        credential: JSON.stringify({})
      })
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
})
