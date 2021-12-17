<template>
  <section class="login-page">
    <div class="container">
      <v-form @submit.prevent="checkForm">
        <div class="block-form">
          <h1 class="title-h1">Авторизация</h1>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              :class="v$.form.email.$error ? 'input-invalid' : ''"
              v-model.trim="form.email"
              label="Введите ваш e-mail"
              type="email"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.email.$error"
              >E-mail введен неверно</span
            >
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              :class="v$.form.userPassword.$error ? 'input-invalid' : ''"
              v-model.trim="form.userPassword"
              :counter="10"
              type="password"
              label="Введите ваш пароль"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.userPassword.$error"
              >Пароль введен неверно</span
            >
          </v-col>
          <v-btn type="submit" :disabled="loading">Авторизоваться</v-btn>
        </div>
      </v-form>
    </div>
  </section>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
  data: () => ({
    form: {
      userPassword: '',
      email: ''
    }
  }),
  setup: () => ({ v$: useValidate() }),
  validations () {
    return {
      form: {
        userPassword: { required },
        email: { required, email }
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    checkForm () {
      this.v$.$validate()
      if (!this.v$.$error) {
        const user = {
          email: this.form.email,
          userPassword: this.form.userPassword
        }
        this.$store
          .dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch((e) => {
            console.log(e.message)
          })
      }
    }
  }
}
</script>
