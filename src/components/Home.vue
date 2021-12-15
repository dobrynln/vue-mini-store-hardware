<template>
  <section class="home-page">
    <div class="container">
      <div class="block-swiper">
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
          <swiper-slide v-for="(item, i) in products" :key="i">
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
    products: [
      {
        id: '1',
        title: 'Lenovo Legion Y520',
        vendor: 'Lenovo',
        color: 'black',
        material: 'metal/plastic',
        description:
          'Intel Core i5 7300HQ 2500 MHz/15.6"/1920x1080/8Gb/1000Gb HDD/DVD нет/NVIDIA GeForce GTX 1050, 4096 МБ/Wi-Fi/Bluetooth/Win 10 Home',
        price: 760,
        promo: false,
        imageSrc: 'https://image.ibb.co/fZzq1o/Lenovo_Legion_Y520.jpg'
      },
      {
        id: '2',
        title: 'Asus FX503VD',
        vendor: 'Asus',
        color: 'white',
        material: 'plastic',
        description:
          'Intel Core i5 7300HQ 2500 MHz/15.6"/1920x1080/8Gb/256Gb SSD/DVD нет/NVIDIA GeForce GTX 1050/Wi-Fi/Bluetooth/Windows 10 Home',
        price: 984,
        promo: true,
        imageSrc: 'https://image.ibb.co/cpScgo/ASUS_FX503_VD.jpg'
      },
      {
        id: '3',
        title: 'ASUS TUF Gaming FX504GD',
        vendor: 'Asus',
        color: 'black',
        material: 'metal/plastic',
        description:
          'Intel Core i7 8750H 2300 MHz/15.6"/1920x1080/12Gb/1000Gb HDD/DVD нет/NVIDIA GeForce GTX 1050, 4096 МБ/Wi-Fi/Bluetooth/Win 10 Home',
        price: 1220,
        promo: true,
        imageSrc: 'https://image.ibb.co/jBZOMo/ASUS_TUF_Gaming_FX504_GD.jpg'
      },
      {
        id: '4',
        title: 'HP Omen 17',
        vendor: 'Hp',
        color: 'black',
        material: 'metal/plastic',
        description:
          'Intel Core i7 7700HQ 2800 MHz/17.3"/1920x1080/12Gb/1128Gb HDD+SSD/DVD-RW/NVIDIA GeForce GTX 1060/Wi-Fi/Bluetooth/Windows 10 Home',
        price: 1600,
        promo: false,
        imageSrc: 'https://image.ibb.co/g6czu8/HP_Omen_17.jpg'
      },
      {
        id: '5',
        title: 'Acer Swift 5 SF514',
        vendor: 'Acer',
        color: 'gold',
        material: 'metal',
        description:
          'Intel Core i7 8550U 1800 MHz/14"/1920x1080/16Gb/512Gb SSD/DVD нет/Intel HD Graphics 620/Wi-Fi/Bluetooth/Windows 10 Home',
        price: 1100,
        promo: true,
        imageSrc: 'https://image.ibb.co/mrOsgo/Acer_Swift_5.jpg'
      },
      {
        id: '6',
        title: 'Apple MacBook (MLHC2RU/A)',
        vendor: 'Apple',
        color: 'silver',
        material: 'metal',
        description:
          'Intel Core m3 1200 MHz/12"/2304x1440/8Gb/256Gb SSD/DVD нет/Intel HD Graphics 615/Wi-Fi/Bluetooth/MacOS X',
        price: 980,
        promo: true,
        imageSrc: 'https://image.ibb.co/fxDsgo/Apple_macbook.jpg'
      }
    ],
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
