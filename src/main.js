import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyD4bevo3dtTz37Gjy5-tm2LSWq7mCbnywk',
  authDomain: 'minihardwate.firebaseapp.com',
  projectId: 'minihardwate',
  storageBucket: 'minihardwate.appspot.com',
  messagingSenderId: '295340703327',
  appId: '1:295340703327:web:e0cb3fca47aeb19503a5ea',
  measurementId: 'G-22M9V2TWM5'
})

loadFonts()

createApp(App).use(router).use(store).use(vuetify).mount('#app')
