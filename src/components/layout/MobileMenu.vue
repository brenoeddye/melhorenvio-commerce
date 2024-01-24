<script lang="ts">
import menuData from '../../core/data/menuData';
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        show: Boolean
    },
    data() {
        return {
            menuData: menuData,
        }
    },
    methods: {
        toggleMenu() {
            this.$emit('toggleMenu');
        },

        pushRouter(category: string) {
            this.toggleMenu();
            this.$router.push({ name: 'productCategory', params: { category } });
        }
    }
})
</script>

<template>
    <div class="mobile-nav" :class="{ active: show }">
        <ul>
            <li class="mobile-nav__title">
                {{ $t('header-navbar-title') }}
                <baseIcon @click="toggleMenu" icon="close" width="30" height="30" colors="primary" clickable/>
            </li>
            <li v-for="(item, index) in menuData" :key="index">
                <a @click="pushRouter(item.link)" :target="item.isNewTab ? '_blank' : ''"> {{ $t(item.content) }}</a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.mobile-nav {
    position: fixed;
    background-color: var(--secondary);
    width: 100%;
    height: 100vh;
    right: -100%;
    padding: 12px 18px;
    visibility: hidden;
    opacity: 0;
    transition: all .3s linear;
    z-index: $header-menu;

    &.active {
        right: 0;
        visibility: visible;
        opacity: 1;
    }

    @include desktop {
        display: none;
    }

    &__title {
        color: var(--primary);
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }

    li {
        padding: 12px 0;
        border-bottom: 1px solid var(--primary-border);
    }
}
</style>