<script lang="ts">
import { defineComponent } from 'vue'
import { useCartStore } from '@/stores/cart';

export default defineComponent({
    props: {
        show: Boolean
    },
    methods: {
        removeFromCart(productId: any) {
            useCartStore().removeFromCart(productId);
        },

        toggleCart() {
            this.$emit('toggleCart');
        },

        updateQuantity(item: any, action: string) {
            const cartStore = useCartStore();
            if (action === 'increase') {
                cartStore.increaseQuantity(item.product.id);
            } else if (action === 'decrease') {
                cartStore.decreaseQuantity(item.product.id);
            }
        },
    },
    computed: {
        cartItems() {
            return useCartStore().items;
        },
        totalItems() {
            return this.cartItems.reduce((total, item) => total + item.quantity, 0);
        },
        subtotal() {
            const rawSubtotal = this.cartItems.reduce((total, item) => {
                const price = item.product?.price ?? 0;
                return total + (item.quantity * price);
            }, 0);
            return rawSubtotal.toFixed(2);
        },
    },
})
</script>

<template>
    <div class="cart" :class="{ active: show }">
        <div class="cart__header">
            <baseIcon @click="toggleCart" icon="arrow-left" width="26" height="24" colors="primary" clickable/>
            <h2 class="cart__header--title">Meu carrinho</h2>
        </div>
        <ul class="cart__items">
            <li v-for="item in cartItems" :key="item.product.id">
                <div class="cart__items--product">
                    <figure class="cart__items--product-figure">
                        <img :src="item.product.imgSrc" :alt="item.product.name">
                    </figure>
                    <figcaption class="cart__items--product-figcaption">
                        <h3 class="cart__items--product-figcaption-name">{{ item.product.name }}</h3>
                        <div class="cart__items--product-details">
                            <div class="cart__items--product-quantity">
                                <button class="cart__items--product-quantity-minus" @click="updateQuantity(item, 'decrease')">
                                    <baseIcon 
                                        icon="arrow-left"
                                        width="28" height="28"
                                        colors="primary"
                                        clickable
                                    />
                                </button>
                                <span>{{ item.quantity }}</span>
                                <button class="cart__items--product-quantity-plus" @click="updateQuantity(item, 'increase')">
                                    <baseIcon 
                                        icon="arrow-right"
                                        width="28" height="28"
                                        colors="primary"
                                        clickable
                                    />
                                </button>
                            </div>
                            <div class="cart__items--product-total">
                                <span>Total</span>
                                <b>${{ item.product.price }}</b>
                            </div>
                        </div>
                    </figcaption>

                    <baseIcon class="cart__items--product-delete" @click="removeFromCart(item.product.id)" icon="delete" width="20" height="20" colors="secondary"/>
                </div>
            </li>
        </ul>
        <div class="cart__footer">
            <span>Detalhes de pagamento</span>

            <ul class="cart__footer--resume">
                <li class="cart__footer--resume-fields">
                    <span>Número de itens:</span>
                    <b>{{ totalItems }} itens</b>
                </li>
                <li class="cart__footer--resume-fields">
                    <span>Subtotal: </span>
                    <b class="total">$ {{ subtotal }}</b>
                </li>
            </ul>

            <baseButton class="cart__footer--finish" type="finish">Finalizar compra</baseButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart {
    position: fixed;
    width: 400px;
    height: 100vh;
    background-color: var(--tertiary);
    padding: 12px 32px;
    top: 0;
    right: -30%;
    visibility: hidden;
    opacity: 0;
    transition: all .4s linear;
    z-index: $cart;

    @include phone {
        width: 100%;
        padding: 12px 24px;
        right: -100%;
        transition: all .65s ease-in-out;
    }

    &.active {
        right: 0;
        visibility: visible;
        opacity: 1;
    }

    &__header {
        display: flex;
        &--title {
            font-size: 20px;
            margin-bottom: 27px;
        }
    }

    &__items {
        overflow-y: scroll;
        max-height: 67vh;
        &--product {
            display: flex;
            background-color: var(--secondary);
            border: 1px solid var(--secondary-border);
            box-shadow: var(--box-shadow);
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 39px;
            position: relative;

            &-figure {
                min-width: 83px;
                max-width: 83px;
                max-height: 100px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            &-figcaption {
                margin-left: 6px;
                width: 64%;
                &-name {
                    font-size: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-bottom: 14px;
                }
            }

            &-quantity {
                background-color: var(--secondary);
                border: 1px solid var(--secondary-border);
                box-shadow: var(--box-shadow);
                display: flex;
                align-items: center;
                border-radius: 4px;

                @media (max-width: 374px) {
                    margin-bottom: 8px;
                }

                button {
                    background-color: var(--secondary);
                    padding: 4px 2px;
                }

                span {
                    padding: 0 18px;
                }

                &-minus {
                    border-right: 1px solid var(--secondary-border);
                }

                &-plus {
                    border-left: 1px solid var(--secondary-border);
                }
            }

            &-details {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 6px;

                @media (max-width: 374px) {
                    flex-direction: column;
                    align-items: start;
                }
            }

            &-total {
                display: flex;
                flex-direction: column;

                span {
                    font-size: 10px;
                }

                b {
                    font-size: 16px;
                }
            }

            &-delete {
                position: absolute;
                right: 6px;
                cursor: pointer;
            }
        }
    }

    &__footer {
        > span {
            font-size: 20px;
            font-weight: 600;
        }

        &--resume {
            background-color: var(--secondary);
            border: 1px solid var(--secondary-border);
            box-shadow: var(--box-shadow);
            border-radius: 4px;
            margin-top: 32px;
            padding: 16px 12px;

            &-fields {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;

                span {
                    font-size: 16px;
                }

                b {
                    font-weight: 400;

                    &.total {
                        font-weight: 700;
                    }
                }
            }
        }

        &--finish {
            width: 100%;
            margin-top: 24px;
        }
    }
}
</style>