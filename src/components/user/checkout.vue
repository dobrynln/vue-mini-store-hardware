<template>
  <section class="checkout-page">
    <div class="container">
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
              @change="makeOrder(order)"
              color="success"
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
  </section>
</template>

<script>
export default {
  data: () => ({
    orders: [
      {
        name: 'Vladimir',
        id: 'test',
        phone: '89644444',
        productId: '1',
        done: false
      },
      {
        name: 'Vladimir',
        id: 'test',
        phone: '89644444',
        productId: '1',
        done: false
      }
    ]
  }),
  methods: {
    makeOrder (order) {
      order.done = true
    }
  }
}
</script>
