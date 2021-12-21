<template>
  <section class="checkout-page">
    <div class="loader-page" v-if="loading">
      <v-progress-circular :width="5" indeterminate></v-progress-circular>
    </div>
    <div class="container" v-else-if="!loading && orders.length !== 0">
      <h1 class="title-h1">Обработка заказов пользователей</h1>
      <div class="checkout-product">
        <div
          class="checkout-product__item"
          v-for="(order, i) in orders"
          :key="i"
        >
          <div class="checkout-left">
            <v-checkbox
              class="checkout-box"
              :input-value="order.done"
              v-model="order.done"
              @change="makeOrder(order)"
              color="success"
              type="checkbox"
            ></v-checkbox>
            <div class="checkout-left__persona">
              <span class="title-persona">Имя: {{ order.name }}</span>
              <span class="title-phone">Телефон: {{ order.phone }}</span>
            </div>
          </div>
          <v-btn flat class="btn-checkout" :to="'/product/' + order.productId"
            >Товар</v-btn
          >
        </div>
      </div>
    </div>
    <div class="else-checkout" v-else>Никто ничего не заказывал</div>
  </section>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    makeOrder (order) {
      this.$store
        .dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch((e) => {
          console.log(e)
        })
      console.log(order)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  created () {
    this.$store.dispatch('fetchOrder')
    console.log(this.orders)
  }
}
</script>
