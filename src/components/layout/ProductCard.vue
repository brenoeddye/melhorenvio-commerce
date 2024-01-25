<script lang="ts">
import { defineComponent } from 'vue'
import { useCartStore } from '@/stores/cart';

export default defineComponent({
    props: {
        id:     Number,
        name:   String,
        price:  Number,
        imgSrc: String,
        size:   String,
    },
    data() {
        return {
            imgObj: {
                src: this.imgSrc,
                loading: '/imgs/loading.svg'
            },

            quantity: 1,
            showModal: false,
        }
    },
    methods: {
        addToCart() {
            if (this.showModal == true)
                this.showModal = false;

            const productToAdd = {
                id:     this.id,
                name:   this.name,
                price:  this.price,
                imgSrc: this.imgSrc,
            };

            useCartStore().addToCart(productToAdd, this.quantity);
        },

        updateQuantity(action: string) {
            if (action === 'increase') {
                this.quantity += 1;
            } else if (action === 'decrease') {
                this.quantity -= 1;
                if (this.quantity < 1)
                    this.quantity = 1;
            }
        },
    },
    computed: {
        limitedName() {
            const maxLength = 32;
            return this.name ? (this.name.length > maxLength ? `${this.name.slice(0, maxLength)}...` : this.name) : '';
        },
    },
})
</script>

<template>
    <div :class="'product ' + size">
        <div class="product__header">
            <span>$ {{ price }}</span>

            <baseIcon icon="heart" width="18" height="16" colors="secondary"/>
        </div>
        <figure class="product__figure">
            <img class="product__figure--img" v-lazy="imgObj" :alt="name">
        </figure>

        <figcaption class="product__figcaption">
            <span v-if="size == 'medium'">$ {{ price }}</span>
            <h2 class="product__figcaption--name">{{ limitedName }}</h2>

            <baseButton class="product__figcaption--buy" @click="addToCart" type="primary">Adicionar</baseButton>
            <baseButton class="product__figcaption--buyMore" @click="showModal = true" type="secondary">Adicionar mais</baseButton>
        </figcaption>
    </div>

    <div class="modal__overlay" :class="{ active: showModal }"></div>
    <div class="modal" :class="{ active: showModal }">
        <div class="modal__header">
            <h3>Escolha a quantidade</h3>

            <baseIcon 
                @click="showModal = false"
                class="modal__header--close"
                icon="close"
                width="30" height="30"
                colors="primary"
                clickable
            />
        </div>

        <div class="modal__content">
            <figure>
                <img v-lazy="imgObj" :alt="name">
            </figure>

            <figcaption>
                <h2>{{ limitedName }}</h2>

                <div class="modal__content--quantity">
                    <button class="modal__content--quantity-minus" @click="updateQuantity('decrease')">
                        <baseIcon 
                            icon="arrow-left"
                            width="28" height="28"
                            colors="primary"
                            clickable
                        />
                    </button>
                    <span>{{ quantity }}</span>
                    <button class="modal__content--quantity-plus" @click="updateQuantity('increase')">
                        <baseIcon 
                            icon="arrow-right"
                            width="28" height="28"
                            colors="primary"
                            clickable
                        />
                    </button>
                </div>

                <baseButton @click="addToCart" type="primary">Comprar</baseButton>
            </figcaption>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.product {
    position: relative;
    background-color: var(--secondary);
    border: 1px solid var(--secondary-border);
    box-shadow: var(--box-shadow);
    border-radius: 8px;
    padding: 12px;
    max-width: 230px;
    min-width: 230px;
    transition: all .3s linear;

    @include phone {
        max-width: 100%;
        min-width: 100%;
    }
    
    &:focus {
        border: 1px solid var(--secondary-border);
        box-shadow: var(--box-shadow);
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__figure {
        position: relative;
        max-width: 120px;
        min-height: 220px;
        max-height: 220px;
        margin: auto;
        display: flex;
        align-items: center;
        z-index: $product;

        &--img {
            width: 100%;
        }
    }

    &__figcaption {
        &--name {
            font-size: 14px;
            font-weight: 400;
            min-height: 31px;
            margin: 6px 0 14px;
        }

        &--buy {
            margin-bottom: 8px;
        }
    }

    button {
        width: 100%;
    }

    &.medium {
        display: flex;
        width: 100%;
        max-width: 100%;
        min-width: 100%;
        margin: 8px;
        .product__header {
            display: none;
        }

        .product__figure {
            max-width: 120px;
            max-height: 180px;
        }

        .product__figcaption {
            padding: 0 24px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            span {
                font-size: 32px;
            }

            &--buyMore {
                display: none;
            }
        }
    }
}

.modal {
    background-color: var(--secondary);
    border: 1px solid var(--secondary-border);
    box-shadow: var(--box-shadow);
    border-radius: 4px;
    padding: 24px;
    position: fixed;
    top: 30%;
    left: 40%;
    max-width: 400px;
    visibility: hidden;
    opacity: 0;
    z-index: $modal-overlay;
    transition: all .3s linear;

    &.active {
        visibility: visible;
        opacity: 1;
    }

    @include mobile {
        width: 100%;
        max-width: 100%;
        top: initial;
        left: 0;
        bottom: -30%;

        &.active {
            bottom: 0;
        }

        .modal__content {
            justify-content: center;
        }
    }

    &__overlay {
        position: fixed;
        top: 0;
        left: 0;
        background-color: var(--overlay);
        visibility: hidden;
        opacity: 0;
        width: 100vw;
        height: 100vh;
        transition: all .3s linear;
        z-index: $modal-overlay;

        &.active {
            visibility: visible;
            opacity: 1;
        }
    }

    &__header {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        margin: auto;
        text-align: center;

        h3 {
            display: block;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--secondary-border);
        }

        &--close {
            position: absolute;
            top: -4px;
            right: 0;
        }
    }

    &__content {
        display: flex;
        align-items: center;
        margin-top: 12px;
        
        figure {
            max-width: 140px;
            img {
                width: 100%;
            }
        }

        figcaption {
            padding: 0 12px;
            h2 {
                font-size: 20px;
            }

            .modal__content--quantity {
                background-color: var(--secondary);
                border: 1px solid var(--secondary-border);
                box-shadow: var(--box-shadow);
                display: flex;
                align-items: center;
                width: 100%;
                border-radius: 4px;
                margin: 14px 0;

                button {
                    background-color: var(--secondary);
                    padding: 4px 2px;
                }

                span {
                    padding: 0 18px;
                    text-align: center;
                    width: 60%;
                }

                &-minus {
                    border-right: 1px solid var(--secondary-border);
                    width: 20%;
                }

                &-plus {
                    border-left: 1px solid var(--secondary-border);
                    width: 20%;
                }
            }
        }
    }
}
</style>