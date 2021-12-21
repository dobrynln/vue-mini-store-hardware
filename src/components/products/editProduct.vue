<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"> Редактировать </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Редактирование товара
      </v-card-title>

      <v-col cols="12" md="12">
        <v-text-field
          class="input-custom"
          v-model.trim="editTitle"
          type="text"
          label="Введите название товара"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="12">
        <v-textarea
          solo
          class="textarea-custom"
          v-model.trim="editDescr"
          label="Введите описание товара"
          multi-line
          type="text"
        ></v-textarea>
      </v-col>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="requestCancel"> Отмена </v-btn>
        <v-btn @click="requestSave">Сохранить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditProduct',
  props: ['product'],
  data: () => ({
    dialog: false,
    editTitle: '',
    editDescr: ''
  }),
  methods: {
    requestCancel () {
      this.editTitle = this.product.title
      this.editDescr = this.product.description
      this.dialog = false
    },
    requestSave () {
      if (this.editTitle !== '' && this.editTitle !== '') {
        this.$store.dispatch('updateProduct', {
          title: this.editTitle,
          description: this.editDescr,
          id: this.product.id
        })
      }
      const htmlClass = document.querySelector('html')
      if (htmlClass.classList.contains('v-overlay-scroll-blocked')) {
        htmlClass.classList.remove('v-overlay-scroll-blocked')
      }
      this.dialog = false
    }
  },
  created () {
    this.editTitle = this.product.title
    this.editDescr = this.product.description
  },
  computed: {},
  watch: {}
}
</script>
