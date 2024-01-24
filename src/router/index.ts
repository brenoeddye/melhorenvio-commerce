import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue'
import ProductListView from '../views/ProductListView.vue'

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
    component: () => import('../views/404View.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;