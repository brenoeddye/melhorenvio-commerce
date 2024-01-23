import { defineStore } from 'pinia';
import { getProducts } from '../core/api/fakeAPI';
import { type IProduct } from '@/core/types/productTypes';

export interface ProductsState {
  products: IProduct[];
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await getProducts();
        this.products = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
});

export default useProductsStore;