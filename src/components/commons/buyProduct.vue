<template>
  <v-dialog v-model="dialog" class="dialog-buy">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="btn-buy"> Купить </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Оформление товара
      </v-card-title>

      <v-col cols="12" md="12">
        <v-text-field
          class="input-custom"
          v-model.trim="name"
          type="text"
          label="Введите имя"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field
          class="input-custom"
          v-model.trim="phone"
          type="phone"
          label="Введите номер телефона"
          required
        ></v-text-field>
      </v-col>
      <v-card-actions v-if="!loadingLocal">
        <v-spacer></v-spacer>
        <v-btn color="red" @click="requestCancel"> Отмена </v-btn>
        <v-btn @click="requestSave">Отправить</v-btn>
      </v-card-actions>
      <div class="v-else__buy" v-else>Отправка....</div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditProduct',
  props: ['product'],
  data: () => ({
    dialog: false,
    name: '',
    phone: '',
    loadingLocal: false
  }),
  methods: {
    requestCancel () {
      this.name = ''
      this.phoner = ''
      this.dialog = false
    },
    requestSave () {
      if (this.editTitle !== '' && this.editTitle !== '') {
        this.loadingLocal = true
        this.$store
          .dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            productId: this.product.id,
            ownerId: this.product.ownerId
          })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.dialog = false
            this.loadingLocal = false
          })
      }
    }
  },
  computed: {},
  watch: {}
}
</script>
