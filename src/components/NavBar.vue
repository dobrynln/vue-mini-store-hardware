<template>
  <header class="header">
    <div class="container">
      <div class="menu-header">
        <div class="menu-header__left">
          <v-app-bar-nav-icon
            @click.stop="openNavBar()"
            class="d-xl-none d-lg-none d-md-none"
          ></v-app-bar-nav-icon>
          <router-link to="/">
            <span class="title-store"
              >Dobrynin <span>dev</span></span
            ></router-link
          >
        </div>
        <v-navigation-drawer v-model="isNavBar" absolute bottom temporary>
          <ul class="nav-list">
            <v-btn
              class="nav-link"
              v-for="(link, i) in linksNav"
              :key="i"
              :to="link.url"
            >
              <v-icon left>{{ link.icon }}</v-icon> {{ link.title }}
            </v-btn>
          </ul>
        </v-navigation-drawer>
        <nav class="nav hidden-sm-and-down hidden-xs-and-down">
          <ul class="nav-list">
            <v-btn
              class="nav-link"
              v-for="(link, i) in linksNav"
              :key="i"
              :to="link.url"
            >
              <v-icon left>{{ link.icon }}</v-icon> {{ link.title }}
            </v-btn>
            <v-btn
              class="nav-link"
              @click="logoutUser"
              v-if="isUserLogin"
            >
              <v-icon left>mdi-account-remove</v-icon> Выйти
            </v-btn>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'NavBar',
  data: () => ({
    isNavBar: false
  }),
  methods: {
    logoutUser () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    },
    openNavBar () {
      this.isNavBar = !this.isNavBar
      if (this.isNavBar === true) {
        document.querySelector('body').addEventListener('click', () => {
          this.isNavBar = false
        })
      }
    }
  },
  computed: {
    isUserLogin () {
      return this.$store.getters.isUserLogin
    },
    linksNav () {
      if (this.isUserLogin) {
        return [
          { title: 'Корзина', icon: 'mdi-cart-arrow-right', url: '/checkout' },
          { title: 'Мои оборудования', icon: 'mdi-laptop', url: '/list' },
          {
            title: 'Добавить оборудование',
            icon: 'mdi-plus-thick',
            url: '/new'
          }
        ]
      }
      return [
        { title: 'Авторизация', icon: 'mdi-account-lock', url: '/login' },
        {
          title: 'Регистрация',
          icon: 'mdi-account-question',
          url: '/register'
        }
      ]
    }
  }
}
</script>
