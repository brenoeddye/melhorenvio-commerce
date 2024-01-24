<script lang="ts">
import { useCartStore } from '@/stores/cart';
import { defineComponent } from 'vue'

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
            }
        }
    },
    methods: {
        addToCart() {
            const productToAdd = {
                id:     this.id,
                name:   this.name,
                price:  this.price,
                imgSrc: this.imgSrc,
            };

            useCartStore().addToCart(productToAdd);
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
            <span>{{ $t('currency') }}{{ price }}</span>

            <baseIcon icon="heart" width="18" height="16" colors="secondary"/>
        </div>
        <figure class="product__figure">
            <img class="product__figure--img" v-lazy="imgObj" :alt="name">
        </figure>
        <figcaption class="product__figcaption">
            <span v-if="size == 'medium'">{{ $t('currency') }}{{ price }}</span>
            <h2 class="product__figcaption--name">{{ limitedName }}</h2>

            <baseButton @click="addToCart" type="primary">{{ $t('btn-add') }}</baseButton>
        </figcaption>
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
                font-size: 34px;
            }
        }
    }
}
</style>