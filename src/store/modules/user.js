import firebase from 'firebase/compat/app'
class User {
  constructor (id) {
    this.id = id
  }
}
export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async regUser ({ commit }, { email, userPassword }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, userPassword)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        commit('setError', err.message)
        throw err
      }
    },
    async loginUser ({ commit }, { email, userPassword }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, userPassword)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        commit('setError', err.message)
        throw err
      }
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
