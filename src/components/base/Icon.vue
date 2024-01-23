<script lang="ts">
import icons from '@/assets/icons/icons.json';
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        icon: String,
        width: String,
        height: String,
        colors: String
    },
    computed: {
        iconData() {
            return icons.find((item) => item.icon === this.icon) || null;
        },
        iconSource() {
            return this.iconData ? this.iconData.data : null;
        },
    }
})
</script>

<template>
    <i class="app-icon" v-if="iconSource" :style="{ backgroundImage: `url(${iconSource})`, width: `${width}px`, height: `${height}px` }" :class="colors"></i>
</template>

<style lang="scss" scoped>
.app-icon {
    background-size: 100%;
    display: flex;

    &.primary {
        filter: invert(22%) sepia(100%) saturate(1800%) hue-rotate(199deg) brightness(97%) contrast(96%);
    }

    &.white {
        filter: invert(100%) sepia(0%) saturate(7478%) hue-rotate(40deg) brightness(105%) contrast(105%);
    }
}
</style>