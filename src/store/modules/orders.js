import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/storage'

class Order {
  constructor (name, phone, productId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.productId = productId
    this.done = done
    this.id = id
  }
}
export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({ commit }, { name, phone, productId, ownerId }) {
      const order = new Order(name, phone, productId)
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${ownerId}/orders/`).push(order)
      } catch (e) {
        commit('setError', e.message)
      }
    },
    async fetchOrder ({ commit, getters }) {
      commit('setLoading', true)
      commit('clearError')
      const resOrders = []
      try {
        const fbVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        console.log(orders)
        Object.keys(orders).forEach(key => {
          const order = orders[key]
          resOrders.push(new Order(order.name, order.phone, order.productId, order.done, key))
        })
        commit('loadOrders', resOrders)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
      }
    },
    async markOrderDone ({ commit, getters }, payload) {
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (e) {
        commit('setError', e.message)
        throw e
      }
    }
  },
  getters: {
    orders (state) {
      return state.orders
    }
  }
}
