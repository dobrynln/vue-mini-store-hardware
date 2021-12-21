<template>
  <section class="home-page">
    <div class="container" v-if="!loading">
      <div class="block-swiper">
        <h1 class="title-h1">Акции на товары:</h1>
        <swiper
          class="swiper-home"
          :modules="modules"
          :slides-per-view="3"
          :space-between="40"
          :navigation="swiperOptions.navigations"
          :autoplay="{ delay: 5000 }"
          :scrollbar="{ draggable: true }"
          :breakpoints="swiperOptions.breakpoints"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="(product, i) in promoProducts" :key="i">
            <router-link
              :aria-label="product.title"
              :to="'/product/' + product.id"
              ><img :src="product.imageSrc" alt="Img hardware" />
            </router-link>
          </swiper-slide>
        </swiper>
        <button class="my-prev swiper-button-disabled"></button>
        <button class="my-next"></button>
      </div>
      <div class="block-product">
        <h1 class="title-h1">Товары</h1>
        <div class="block-hardware">
          <div class="hardware-item" v-for="(product, i) in products" :key="i">
            <router-link
              :aria-label="product.title"
              :to="'/product/' + product.id"
            >
              <div class="hardware-item__img">
                <img :src="product.imageSrc" alt="Img hardware" /></div
            ></router-link>
            <span class="title-hardware">{{ product.title }}</span>
            <span class="decr-hardware"
              >{{
                product.description.lenght > 40
                  ? product.description.substring(0, 40)
                  : product.description
              }}...</span
            >
            <span class="price-hardware">{{ product.price }} USD</span>
            <div class="button-hardware">
              <v-btn flat :to="'/product/' + product.id">Посмотреть</v-btn>
              <app-buy-dialog :product="product"></app-buy-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loader-page" v-else>
      <v-progress-circular
        :width="5"
        indeterminate
      ></v-progress-circular>
    </div>
  </section>
</template>

<script>
import { Navigation, A11y, Autoplay } from 'swiper'
import buyDialogProduct from '@/components/commons/buyProduct'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/less'
import 'swiper/less/navigation'
export default {
  data: () => ({
    swiperOptions: {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        375: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 20
        }
      },
      navigations: {
        nextEl: '.my-next',
        prevEl: '.my-prev'
      }
    }
  }),
  components: {
    Swiper,
    SwiperSlide,
    'app-buy-dialog': buyDialogProduct
  },
  computed: {
    products () {
      return this.$store.getters.products
    },
    promoProducts () {
      return this.$store.getters.promoProduct
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  setup () {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, A11y, Autoplay]
    }
  }
}
</script>
