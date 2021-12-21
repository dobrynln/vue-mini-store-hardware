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
              <editProduct :product="product"></editProduct>
              <app-buy-dialog
                :product="product"
              ></app-buy-dialog>
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
import editProduct from './editProduct'
import buyDialogProduct from '@/components/commons/buyProduct'
export default {
  data: () => ({}),
  props: ['id'],
  computed: {
    product () {
      const id = this.id
      return this.$store.getters.infoProduct(id)
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  components: {
    editProduct,
    'app-buy-dialog': buyDialogProduct
  }
}
</script>
