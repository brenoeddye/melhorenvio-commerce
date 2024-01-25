<script lang="ts">
import { defineComponent } from 'vue'
import { useProductsStore } from '@/stores/productsAPI';

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
        filteredProducts() {
            const category = this.$route.params.category;
            return this.productsStore.products.filter(product => product.category === category);
        },
    },
    mounted() {
        this.fetchProducts();
    },
})
</script>

<template>
    <main role="main" class="product-list">
        <div class="container">
            <div class="product-list__header">
                <h2 class="product-list__header--title">{{ $route.params.category }}</h2>
            </div>

            <ul class="product-list__products">
                <layoutProductCard
                        v-for="product in filteredProducts" :key="product.id"
                        :id="product.id"
                        :name="product.title"
                        :price="product.price"
                        :imgSrc="product.image" />
            </ul>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.product-list {
    padding-top: 105px;

    @include phone {
        padding-top: 140px;
    }

    @include tablet {
        padding-top: 119px;
    }

    .container {
        @include container;
    }

    &__header {
        h2 {
            margin-bottom: 24px;
        }
    }

    &__products {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 20px; 

        @include phone {
            grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
            gap: 8px; 
        }
    }
}
</style>