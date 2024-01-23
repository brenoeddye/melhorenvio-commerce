import { defineStore } from 'pinia';

interface IProduct {
    id?:         number;
    name?:       string;
    price?:      number;
    imgSrc?:     string;
}

interface ICart {
    product:    IProduct;
    quantity:   number;
}

export const useCartStore = defineStore('cart', {
    state: () => ({
      items: [] as ICart[],
    }),
    actions: {
      addToCart(product: IProduct) {
        const hasItem = this.items.find((item) => item.product.id === product.id);
  
        if (hasItem) {
            hasItem.quantity++;
        } else {
          this.items.push({ product, quantity: 1 });
        }
      },
      removeFromCart(productId: number) {
        this.items = this.items.filter((item) => item.product.id !== productId);
      },
    },
  });