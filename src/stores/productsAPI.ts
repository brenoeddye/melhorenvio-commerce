import { defineStore } from 'pinia';
import { getProducts } from '../core/api/fakeAPI';
import { type IProduct } from '@/core/types/productTypes';

export interface ProductsState {
    products: IProduct[];
    searchResults: IProduct[];
}

export const useProductsStore = defineStore('products', {
    state: (): ProductsState => ({
        products: [],
        searchResults: [],
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

      async searchProducts(query: string) {
          if (!query) {
              this.searchResults = [];
          } else {
              const lowercaseQuery = query.toLowerCase();
              this.searchResults = this.products.filter((product) =>
                product.title.toLowerCase().includes(lowercaseQuery)
              );
          }
      },
    },
});

export default useProductsStore;