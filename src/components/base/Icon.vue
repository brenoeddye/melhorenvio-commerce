<script lang="ts">
import icons from '@/assets/icons/icons.json';
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        icon:   String,
        width:  String,
        height: String,
        colors: String,
        badge:  Number
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
    <div class="app-icon">
        <div v-if="badge" class="badge">
            {{ badge }}
        </div>
        <i class="icon" v-if="iconSource" :style="{ backgroundImage: `url(${iconSource})`, width: `${width}px`, height: `${height}px` }" :class="colors"></i>
    </div>
</template>

<style lang="scss" scoped>
.app-icon {
    position: relative;
}
.icon {
    background-size: 100%;
    display: flex;

    &.primary {
        filter: invert(22%) sepia(100%) saturate(1800%) hue-rotate(199deg) brightness(97%) contrast(96%);
    }

    &.white {
        filter: invert(100%) sepia(0%) saturate(7478%) hue-rotate(40deg) brightness(105%) contrast(105%);
    }
}
.badge {
    background-color: var(--primary);
    filter: none;
    color: var(--font-color-reverse);
    padding: 2px 6px;
    font-size: 10px;
    border-radius: 100%;
    position: absolute;
    right: -5px;
    z-index: $badge;
}
</style>