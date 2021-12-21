<template>
  <section class="list-product__page">
    <div class="container">
      <h1 class="title-h1 mt-5">Оборудования созданные через админ-панель</h1>
      <div class="list-block">
        <v-col cols="12" md="12">
          <div
            class="list-block__item"
            v-for="(product, i) in myCreateProducts"
            :key="i"
          >
            <div class="list-block__item-left">
              <img :src="product.imageSrc" alt="Img product" />
            </div>
            <div class="list-block__item-right">
              <span class="title-product">{{ product.title }}</span>
              <span class="descr-product">{{ product.description }}</span>
              <v-btn :to="'/product/' + product.id">Посмотреть</v-btn>
            </div>
          </div>
        </v-col>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    myCreateProducts () {
      return this.$store.getters.myCreateProducts
    }
  }
}
</script>
