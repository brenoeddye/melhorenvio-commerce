<script lang="ts">
import { defineComponent } from 'vue'
import { type IProduct } from '@/core/types/productTypes';

export default defineComponent({
    props: {
        show: Boolean,
        searchResults: {
            type: Array as () => IProduct[],
            required: true,
        },
    }
})
</script>

<template>
    <div class="searchPreview__overlay" :class="{ active: show }"></div>
    <div class="searchPreview" :class="{ active: show }">
        <ul class="searchPreview__list">
            <layoutProductCard class="searchPreview__list--item"
                v-for="product in searchResults" :key="product.id"
                :id="product.id"
                :name="product.title"
                :price="product.price"
                :imgSrc="product.image" />
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.searchPreview {
    position: fixed;
    background-color: var(--secondary);
    padding: 24px 0;
    width: 100%;
    visibility: hidden;
    opacity: 0;
    top: -30%;
    transition: all .3s linear;
    z-index: $search-preview;

    &.active {
        visibility: visible;
        opacity: 1;
        top: 88px;

        @include phone {
            top: 110px;
        }
    }

    &__list {
        @include container;
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        @include phone {
            max-height: 80vh;
            overflow-y: scroll;
        }

        &--item {
            margin-right: 10px;

            @include phone {
                margin-bottom: 10px;
            }
        }
    }

    &__overlay {    
        position: fixed;
        background-color: var(--overlay);
        width: 100vw;
        height: 100vh;
        visibility: hidden;
        opacity: 0;
        transition: all .3s linear;
        z-index: $overlay;

        &.active {
            visibility: visible;
            opacity: 1;
        }
    }
}
</style>