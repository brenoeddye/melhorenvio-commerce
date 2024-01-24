<script lang="ts">
import useProductsStore from '../stores/productsAPI';
import '@splidejs/vue-splide/css';
import '@splidejs/splide/css/skyblue';
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            productsStore: useProductsStore(),

            splideOptions: {
                rewind: true,
                arrows: false,
                perPage: 4,
                perMove: 1,
                padding: {right: 60},
                gap: '.8rem',
                breakpoints: {
                    713: {
                        perPage: 1,
                    },
                    1290: {
                        perPage: 2,
                    },
                    1400: {
                        perPage: 3,
                    }
                },
            }
        };
    },
    methods: {
        async fetchProducts() {
            await this.productsStore.fetchProducts();
        },
    },
    computed: {
        products() {
            return this.productsStore.products;
        },
    },
    mounted() {
        this.fetchProducts();
    },
})
</script>

<template>
    <main role="main" class="home">
        <div class="home__slider">
            <Splide :options="splideOptions" aria-label="Melhores produtos">
                <SplideSlide 
                    v-for="product in products.slice(0, 6)" :key="product.id">
                    <layoutProductCard
                        :id="product.id"
                        :name="product.title"
                        :price="product.price"
                        :imgSrc="product.image" 
                        size="medium"/>
                </SplideSlide>
            </Splide>
        </div>

        <div class="home__showcase">
            <h2 class="home__showcase--title">{{ $t('home-title') }}</h2>
            <ul class="container">
                <layoutProductCard
                    v-for="product in products" :key="product.id"
                    :id="product.id"
                    :name="product.title"
                    :price="product.price"
                    :imgSrc="product.image" />
            </ul>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.home {
    padding-top: 105px;

    @include phone {
        padding-top: 140px;
    }

    @include tablet {
        padding-top: 119px;
    }

    &__showcase {
        &--title {
            @include container;
            font-size: 20px;
            margin-top: 24px;
            margin-bottom: 38px;
        }
        .container {
            @include container;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 20px; 

            @include phone {
                grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
                gap: 8px; 
            }
        }
    }

    &__slider {
        @include desktop {
            @include container;
        }
    }
}
</style>