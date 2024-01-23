<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: String,
        value: String,
        imgSrc: String,
    }
})
</script>

<template>
    <div class="product">
        <figure class="product__figure">
            <img :src="imgSrc" :alt="name">
        </figure>
        <figcaption>
            <h2>{{ name }}</h2>
        </figcaption>

        <baseButton>{{ $t('btn-add') }}</baseButton>
    </div>
</template>