<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        type: String
    }
})
</script>

<template>
    <button :class="'btn ' + type">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.btn {
    padding: 8px 24px;
    border-radius: 4px;
    font-size: 14px;
    font-family: $primary-font;
    box-shadow: var(--box-shadow);
    text-transform: uppercase;
    transition: all .3s linear;
    cursor: pointer;

    &.primary {
        background-color: var(--primary);
        color: var(--font-color-reverse);

        &:hover {
            background-color: var(--primary-hover);
        }
    }

    &.finish {
        background-color: var(--primary);
        color: var(--font-color-reverse);
        padding: 14px 24px;

        &:hover {
            background-color: var(--primary-hover);
        }
    }
}
</style>