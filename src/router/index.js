import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home'
import checkout from '@/components/user/checkout'
import NewProduct from '@/components/products/NewProduct'
import product from '@/components/products/product'
import ProductList from '@/components/products/ProductList'
import login from '@/components/auth/login'
import register from '@/components/auth/register'
import authGuard from './auth-guard'
const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'product',
    props: true,
    component: product
  },
  {
    path: '/new',
    name: 'new',
    component: NewProduct,
    beforeEnter: authGuard
  },
  {
    path: '/list',
    name: 'list',
    component: ProductList,
    beforeEnter: authGuard
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: checkout,
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
