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
        addToCart(product: IProduct, quantity?: number) {
            const hasItem = this.items.find((item) => item.product.id === product.id);
            const parsedQuantity = quantity !== undefined ? quantity : 1;

            if (isNaN(parsedQuantity) || parsedQuantity < 1) {
                console.error('Quantidade inválida. A quantidade deve ser um número inteiro positivo.');
                return;
            }

            if (hasItem) {
                hasItem.quantity += parsedQuantity;
            } else {
                this.items.push({ product, quantity: parsedQuantity });
            }
        },

        removeFromCart(productId: number) {
            this.items = this.items.filter((item) => item.product.id !== productId);
        },

        increaseQuantity(productId: number) {
            const item = this.items.find((i) => i.product.id === productId);
            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity(productId: number) {
            const item = this.items.find((i) => i.product.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    this.removeFromCart(productId);
                }
            }
        },
    },
});