import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue';
import ProductListView from '../views/ProductListView.vue';
import errorPage from '../views/404View.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/category/:category',
    name: 'productCategory',
    component: ProductListView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: errorPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;