<script lang="ts">
import useProductsStore from '../stores/productsAPI';
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            productsStore: useProductsStore(),
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
        <div class="container">
            <div class="home__slider">

            </div>

            <div class="home__showcase">
                <ul class="container">
                    <layoutProductCard
                        v-for="product in products" :key="product.id"
                        :name="product.title"
                        :price="product.price"
                        :imgSrc="product.image" />
                </ul>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.home {
    padding-top: 80px;

    &__showcase {
        .container {
            @include container;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 20px; 
        }
    }
}
</style>