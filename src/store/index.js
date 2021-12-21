import { createStore } from 'vuex'
import products from './modules/products'
import user from './modules/user'
import orders from './modules/orders'
import common from './modules/common'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    user,
    common,
    orders
  }
})
