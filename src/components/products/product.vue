<template>
  <section class="product-page">
    <div class="container">
      <div class="product-block">
        <div class="product-block__item">
          <div class="product-block__item-left">
            <img :src="product.imageSrc" alt="img product">
          </div>
          <div class="product-block__item-right">
            <span class="default-title">{{product.title}}</span>
            <span class="default-title">Производитель: {{product.vendor}}</span>
            <span class="default-title">Цена <b>${{product.price}}</b></span>
            <div class="default-title title-color">
              Цвет: <span class="product-color" :title="product.color" :style="{backgroundColor: product.color}"></span>
            </div>
            <span class="default-title">Материал: {{product.material}}</span>
            <span class="default-title">Описание: {{product.description}}</span>
            <div class="product-button">
              <v-btn>Редактировать</v-btn>
              <v-btn class="btn-buy ml-5">Купить</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({}),
  props: ['id'],
  computed: {
    product () {
      const id = this.id
      return this.$store.getters.infoProduct(id)
    }
  }
}
</script>
