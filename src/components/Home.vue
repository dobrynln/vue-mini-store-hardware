<template>
  <section class="home-page">
    <div class="container">
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
          <swiper-slide v-for="(item, i) in promoProducts" :key="i">
            <router-link :aria-label="item.title" :to="'/product/' + item.id"
              ><img :src="item.imageSrc" alt="Img hardware" />
            </router-link>
          </swiper-slide>
        </swiper>
        <button class="my-prev swiper-button-disabled"></button>
        <button class="my-next"></button>
      </div>
      <div class="block-product">
        <h1 class="title-h1">Товары</h1>
        <div class="block-hardware">
          <div class="hardware-item" v-for="(item, i) in products" :key="i">
            <router-link :aria-label="item.title" :to="'/product/' + item.id">
              <div class="hardware-item__img">
                <img :src="item.imageSrc" alt="Img hardware" /></div
            ></router-link>
            <span class="title-hardware">{{ item.title }}</span>
            <span class="decr-hardware"
              >{{ item.description.substring(0, 40) }}...</span
            >
            <span class="price-hardware">{{ item.price }} USD</span>
            <div class="button-hardware">
              <v-btn flat :to="'/product/' + item.id">Посмотреть</v-btn>
              <v-btn flat color="secondary">В корзину</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Navigation, A11y, Autoplay } from 'swiper'

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
    SwiperSlide
  },
  computed: {
    products () {
      return this.$store.getters.products
    },
    promoProducts () {
      return this.$store.getters.promoProduct
    }
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
