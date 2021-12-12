import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home'
import checkout from '@/components/user/checkout'
import NewProduct from '@/components/products/NewProduct'
import product from '@/components/products/product'
import ProductList from '@/components/products/ProductList'
import login from '@/components/auth/login'
import register from '@/components/auth/register'

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'product',
    component: product
  },
  {
    path: '/new',
    name: 'new',
    component: NewProduct
  },
  {
    path: '/list',
    name: 'list',
    component: ProductList
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: checkout
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
