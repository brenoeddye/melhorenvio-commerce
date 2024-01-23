import { defineStore } from 'pinia';
import { getProducts } from '../core/api/fakeAPI';

interface IProduct {
    id:             number,
    title:          string,
    price:          string,
    category:       string,
    description:    string,
    image:          string,
}

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