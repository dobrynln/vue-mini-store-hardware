<template>
  <section class="home-page">
    <div class="container">
      <div class="block-swiper">
        <swiper
          class="swiper-home"
          :modules="modules"
          :slides-per-view="3"
          :space-between="40"
          :navigation="{
            nextEl: '.my-next',
            prevEl: '.my-prev',
            delay: 5000,
          }"
          :autoplay="{ delay: 5000 }"
          :scrollbar="{ draggable: true }"
          :breakpoints="swiperOptions.breakpoints"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
        </swiper>
        <button class="my-prev swiper-button-prev"></button>
        <button class="my-next swiper-button-next"></button>
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
          slidesPerView: 3,
          spaceBetween: 10
        }
      }
    }
  }),
  components: {
    Swiper,
    SwiperSlide
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
