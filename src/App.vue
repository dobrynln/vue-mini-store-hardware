<template>
  <v-app>
    <NavBar />
    <router-view />
    <div class="alert-error" v-if="error">
      <v-alert type="error"
        >Что-то пошло не так... Проверьте данные.
        <v-btn @click="closeAlert">Ок</v-btn>
      </v-alert>
    </div>
  </v-app>
</template>

<script>
import firebase from 'firebase/compat/app'
import NavBar from '@/components/NavBar'
export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({}),
  methods: {
    closeAlert () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style lang="less">
@import "./style/main.less";
</style>
