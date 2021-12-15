<template>
  <section class="product-new__page">
    <div class="container">
      <h1 class="title-h1 mt-5">Добавить продукт на продажу</h1>
      <v-form @submit.prevent="postNewProduct()">
        <div class="new-product">
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              :class="v$.form.title.$error ? 'input-invalid' : ''"
              v-model.trim="form.title"
              label="Введите название продукта"
              type="text"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.title.$error"
              >Название обязательно!</span
            >
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              v-model.trim="form.vendor"
              label="Введите фирму"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              v-model.trim="form.color"
              label="Введите цвет"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              v-model.trim="form.material"
              label="Введите материал"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-textarea
              solo
              class="textarea-custom"
              v-model.trim="form.description"
              label="Введите описание"
              multi-line
              type="text"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              :class="v$.form.price.$error ? 'input-invalid' : ''"
              v-model="form.price"
              label="Введите цену"
              type="number"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.price.$error"
              >Цена обязательно!</span
            >
          </v-col>
          <v-col cols="12" md="4">
            <div class="download-img">
              <img
                src="https://image.ibb.co/fZzq1o/Lenovo_Legion_Y520.jpg"
                alt=""
              />
            </div>
          </v-col>
          <v-btn>Добавить изображение продукта</v-btn>
          <v-switch
            v-model="form.promo"
            flat
            label="Добавить в акцию?"
          ></v-switch>
          <v-btn type="submit">Добавить продукт</v-btn>
        </div>
      </v-form>
    </div>
  </section>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  data: () => ({
    form: {
      title: '',
      vendor: '',
      price: '',
      color: '',
      material: '',
      description: '',
      promo: false
    }
  }),
  setup: () => ({ v$: useValidate() }),
  validations () {
    return {
      form: {
        title: { required },
        price: { required }
      }
    }
  },
  methods: {
    postNewProduct () {
      this.v$.$validate()
      if (!this.v$.$error) {
        const product = {
          title: this.form.title,
          vendor: this.form.vendor,
          color: this.form.color,
          price: +this.form.price,
          material: this.form.material,
          description: this.form.description,
          promo: this.form.promo
        }
        console.log(product)
      } else {
        console.log('not ok')
      }
    }
  }
}
</script>
