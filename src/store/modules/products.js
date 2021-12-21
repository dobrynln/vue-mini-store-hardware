import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/storage'
class Product {
  constructor (title, vendor, color, material, price, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.vendor = vendor
    this.color = color
    this.material = material
    this.price = price
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}
export default {
  state: {
    products: []
  },
  mutations: {
    CreateProduct (state, payload) {
      state.products.push(payload)
    },
    loadProducts (state, payload) {
      state.products = payload
    },
    updateProduct (state, { title, description, id }) {
      const product = state.products.find(a => {
        return a.id === id
      })
      product.title = title
      product.description = description
    }
  },
  actions: {
    async CreateProduct ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        const newProduct = new Product(
          payload.title,
          payload.vendor,
          payload.color,
          payload.material,
          payload.price,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )
        const productAdd = await firebase.database().ref('products').push(newProduct)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await firebase.storage().ref(`products/${productAdd.key}.${imageExt}`).put(image)
        const imageSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await firebase.database().ref('products').child(productAdd.key).update({ imageSrc })
        commit('setLoading', false)
        commit('CreateProduct', {
          ...newProduct,
          id: productAdd.key,
          imageSrc
        })
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    },
    async fetchProducts ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const resProducts = []
      try {
        const productsVal = await firebase.database().ref('products').once('value')
        const products = productsVal.val()
        console.log(products)
        Object.keys(products).forEach(key => {
          const product = products[key]
          resProducts.push(
            new Product(
              product.title,
              product.vendor,
              product.color,
              product.material,
              product.price,
              product.description,
              product.ownerId,
              product.imageSrc,
              product.promo,
              key
            )
          )
          console.log(resProducts)
          commit('loadProducts', resProducts)
          commit('setLoading', false)
        })
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    },
    async updateProduct ({ commit }, { title, description, id }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('products').child(id).update({
          title, description
        })
        commit('updateProduct', {
          title, description, id
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    promoProduct (state) {
      return state.products.filter(product => {
        return product.promo === true
      })
    },
    myCreateProducts (state) {
      return state.products
    },
    infoProduct (state) {
      return productId => {
        return state.products.find(product => product.id === productId)
      }
    }
  }
}
