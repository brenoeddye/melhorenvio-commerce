<script lang="ts">
import useProductsStore from '../stores/productsAPI';
import '@splidejs/vue-splide/css';
import '@splidejs/splide/css/skyblue';
import { defineComponent } from 'vue'
import menuContent from '@/core/data/menuData';

export default defineComponent({
    data() {
        return {
            productsStore: useProductsStore(),
            menuContent: menuContent,
            getResults: false,

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

        selectedCategory(category: string) {
            console.log('Categoria selecionada:', category);
            this.productsStore.filterProductsByCategory(category);
            this.getResults = true;
        }
    },
    computed: {
        products() {
            return this.productsStore.products;
        },

        searchResults() {
            return this.productsStore.searchResults;
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
            <div class="home__showcase--header">
                <h2 class="home__showcase--header-title">Produtos</h2>
                <baseSelect 
                    placeholder="Categorias" 
                    :options="menuContent"
                    @categorySelected="selectedCategory"
                />
            </div>

            <h2 class="home__showcase--warn" v-if="getResults && searchResults.length <= 0">Infelizmente não temos produtos com esta categoria, mas você pode curtir esses:</h2>
            
            <ul v-if="searchResults.length > 0" class="container">
                <layoutProductCard
                    v-for="product in searchResults" :key="product.id"
                    :id="product.id"
                    :name="product.title"
                    :price="product.price"
                    :imgSrc="product.image" />
            </ul>

            <ul class="container" v-else>
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
        &--header {
            @include container;
            display: flex;
            align-items: center;
            justify-content: space-between;

            @media (max-width: 300px) {
                flex-direction: column;
                margin-bottom: 24px;
            }

            &-title {
                font-size: 20px;
                margin-top: 24px;
                margin-bottom: 38px;
            }
        }

        &--warn {
            @include container;
            font-weight: 400;
            margin-bottom: 18px; 
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