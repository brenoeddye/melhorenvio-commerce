<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<template>
    <main role="main" class="not-found">
        <div class="not-found__text">
            <h1>OPS...</h1>
            <p>Está página não foi encontrada.</p>
        </div>

        <img class="not-found__image" src="/imgs/404.webp" alt="404-image">
    </main>
</template>

<style lang="scss" scoped>
.not-found {
    padding-top: 105px;

    @include phone {
        padding-top: 140px;
    }

    &__text {
        position: absolute;
        top: 20%;
        left: 20%;
        z-index: $not-found;

        @include phone {
            position: relative;
            left: 0;
            @include container;
        }

        h1 {
            font-size: 36px;
        }

        p {
            font-size: 20px;
        }
    }

    &__image {
        position: absolute;
        bottom: 0;
        right: 0;
        max-width: 400px;
        width: 100%;

        @include phone {
            max-width: 320px;
        }
    }
}
</style>