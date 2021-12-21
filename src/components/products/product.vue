<template>
  <section class="product-page">
    <div class="container" v-if="!loading">
      <div class="product-block">
        <div class="product-block__item">
          <div class="product-block__item-left">
            <img :src="product.imageSrc" alt="img product" />
          </div>
          <div class="product-block__item-right">
            <span class="default-title">{{ product.title }}</span>
            <span class="default-title"
              >Производитель: {{ product.vendor }}</span
            >
            <span class="default-title"
              >Цена <b>${{ product.price }}</b></span
            >
            <div class="default-title title-color">
              Цвет:
              <span
                class="product-color"
                :title="product.color"
                :style="{ backgroundColor: product.color }"
              ></span>
            </div>
            <span class="default-title">Материал: {{ product.material }}</span>
            <span class="default-title"
              >Описание: {{ product.description }}</span
            >
            <div class="product-button">
              <editProduct :product="product" v-if="buttonEdit"></editProduct>
              <app-buy-dialog :product="product"></app-buy-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loader-page" v-else>
      <v-progress-circular :width="5" indeterminate></v-progress-circular>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase/compat/app'
import editProduct from './editProduct'
import buyDialogProduct from '@/components/commons/buyProduct'
export default {
  data: () => ({
    buttonEdit: false
  }),
  props: ['id'],
  computed: {
    product () {
      const id = this.id
      return this.$store.getters.infoProduct(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwner () {
      return this.product.ownerId === this.$store.getters.user.id
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this.isOwner) {
          this.buttonEdit = true
        } else {
          this.buttonEdit = false
        }
      } else {
        return this.product
      }
    })
  },
  components: {
    editProduct,
    'app-buy-dialog': buyDialogProduct
  }
}
</script>
