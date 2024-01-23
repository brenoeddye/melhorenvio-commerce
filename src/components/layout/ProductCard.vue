<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: String,
        price: String,
        imgSrc: String,
    }
})
</script>

<template>
    <div class="product">
        <div class="product__header">
            <span>{{ price }}</span>
        </div>
        <figure class="product__figure">
            <img class="product__figure--img" :src="imgSrc" :alt="name">
        </figure>
        <figcaption class="product__figcaption">
            <h2 class="product__figcaption--name">{{ name }}</h2>
        </figcaption>

        <baseButton>{{ $t('btn-add') }}</baseButton>
    </div>
</template>

<style lang="scss" scoped>
.product {
    background-color: var(--secondary);
    border: 1px solid var(--secondary-border);
    box-shadow: 0px 2px 5px #26303C33;
    border-radius: 8px;

    &__figure {
        max-width: 120px;
        &--img {
            width: 100%;
        }
    }

    &__figcaption {
        &--name {
            font-size: 14px;
            font-weight: 400;
        }
    }
}
</style>