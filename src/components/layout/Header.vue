<script lang="ts">
import menuData from '../../core/data/menuData';
import { useProductsStore } from '@/stores/productsAPI';
import { useCartStore } from '@/stores/cart';
import { type IProduct } from '@/core/types/productTypes';
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['changeTheme'],
    data() {
        return {
            menuData: menuData,

            searchQuery: '',
            searchResults: [] as IProduct[],

            showSearch: false,
            showCart: false,
            showMenu: false,
            showPreview: false,

            dataTheme: localStorage.getItem('data-theme')
        }
    },
    methods: {
        toggleCart() {
            return this.showCart = !this.showCart;
        },

        toggleMenu() {
            return this.showMenu = !this.showMenu;
        },

        toggleSearch() {
            return this.showPreview = !this.showPreview;
        },

        closeAllSearch() {
            this.showSearch = false;
            this.showPreview = false;
            this.searchQuery = ''
        },

        pushRouter(category: string) {
            this.$router.push({ name: 'productCategory', params: { category } });
        },

        returnTheme() {
            this.$emit('changeTheme');
            this.dataTheme = localStorage.getItem('data-theme') == 'light' ? 'dark' : 'light'
        },

        async handleSearch() {
            try {
                await useProductsStore().searchProducts(this.searchQuery);
                this.searchResults = useProductsStore().searchResults;
                this.showPreview = true;
            } catch (error) {
                console.error('Error during search:', error);
            }
        }
    },
    computed: {
        cartItems() {
            return useCartStore().items;
        },
        
        totalItems() {
            return this.cartItems.reduce((total, item) => total + item.quantity, 0);
        }
    },
})
</script>

<template>
    <header class="header">
        <div class="container">
            <router-link to="/" class="header__logo">
                <img src="/imgs/logo.webp" alt="store-logo">
            </router-link>
            <div class="header__profile">
                <h3 class="header__profile--username">{{ $t('header-username') }}</h3>
                <p class="header__profile--address">{{ $t('header-address') }}</p>
            </div>
            <nav class="header__navbar" :class="{ hide: showSearch }">
                <ul>
                    <li v-for="(item, index) in menuData" :key="index">
                        <a @click="pushRouter(item.link)" :target="item.isNewTab ? '_blank' : ''"> {{ $t(item.content) }}</a>
                    </li>
                </ul>
            </nav>
            <div class="header__search" :class="{ active: showSearch }">
                <div class="container">
                    <form class="header__search--form" @submit.prevent="handleSearch">
                        <baseIcon   @click="closeAllSearch" 
                                    class="header__search--close" 
                                    icon="close" 
                                    width="20" height="20" 
                                    colors="secondary" 
                                    clickable/>

                        <input  v-model="searchQuery"
                                class="header__search--input" 
                                type="text" 
                                placeholder="Busque seu produto">

                        <baseIcon 
                            v-if="searchQuery"
                            @click="closeAllSearch"
                            icon="close"
                            width="24" height="26"
                            colors="secondary"
                            clickable
                        />

                        <input  class="header__search--submit" 
                                type="submit" 
                                value="Search">
                    </form>
                </div>
            </div>
            <div class="header__utils">
                <baseIcon   @click="showSearch = !showSearch" 
                            class="header__utils--search" 
                            icon="search" 
                            width="30" height="30" 
                            colors="primary" 
                            clickable/>
                
                <baseIcon   @click="toggleCart" 
                            icon="cart" 
                            width="30" height="30" 
                            colors="primary" 
                            :badge="totalItems" 
                            clickable/>
                
                <baseIcon   class="header__utils--user" 
                            icon="user" 
                            width="30" height="30" 
                            colors="primary" 
                            clickable/>

                <baseIcon   @click="returnTheme" 
                            :icon="dataTheme == 'light' ? 'dark' : 'light'" 
                            width="30" height="30" 
                            colors="primary" 
                            clickable/>
                
                <baseIcon   @click="toggleMenu" 
                            class="header__utils--menu" 
                            icon="menu" 
                            width="30" height="30" 
                            colors="primary" 
                            clickable/>
            </div>
        </div>
    </header>

    <layoutMobileMenu 
        :show="showMenu" 
        @toggleMenu="toggleMenu"
    />

    <layoutCart 
        :show="showCart" 
        @toggleCart="toggleCart"
    />

    <layoutSearchPreview 
        :show="showPreview"
        v-if="searchResults" 
        :searchResults="searchResults" />
</template>

<style lang="scss" scoped>
.header {
    background-color: var(--secondary);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    padding: 20px 0;
    transition: all .3s linear;
    z-index: $header;

    & > .container {
        @include container;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__logo {
        max-width: 100px;

        @include phone {
            display: none;
        }

        @include tablet {
            display: none;
        }

        img {
            width: 100%;
        }
    }

    &__profile {
        font-size: 18px;
        font-weight: 600;

        &--username {
            font-size: 20px;
            font-weight: 600;
        }

        &--address {
            font-size: 12px;
            font-weight: 400;
        }

        @include desktop {
            display: none;
        }
    }

    &__navbar {
        @include desktop {
            &.hide {
                visibility: hidden;
                opacity: 0;
            }
        }

        ul {
            display: flex;

            @include phone {
                display: none;
            }

            @include tablet {
                display: none;
            } 

            li {
                padding-right: 18px;
                
                a {
                    color: var(--font-color);
                    transition: all .3s linear;

                    &:hover {
                        color: var(--primary-hover);
                    }
                }
            }
        }
    }

    &__search {
        background-color: var(--secondary);
        padding-bottom: 8px;
        width: 100%;
        margin: 0 20px;

        @include phone {
            margin: 0;
        }
        
        & > .container {
            @include phone {
                @include container;
            }
        }

        &--form {
            display: flex;
            align-items: center;
            background-color: var(--secondary);
            border: 1px solid var(--secondary-border);
            border-radius: 6px;
            padding: 8px 14px;
            box-shadow: 0px 2px 5px #26303C33;

            @include phone {
                width: 100%;
            }

            @include tablet {
                width: 100%;
            }
        }

        @include phone {
            position: fixed;
            width: 100%;
            top: 76px;
            left: 0;
        }

        @include desktop {
            position: fixed;
            width: 40%;
            left: 30%;
            visibility: hidden;
            opacity: 0;
            transition: all .3s linear;

            &.active {
                visibility: visible;
                opacity: 1;
            }

            &--input {
                width: 100%;
            }
        }

        &--close {
            display: none;

            @include desktop {
                display: block;
                margin-right: 8px;
            }
        }

        &--input {
            background-color: var(--secondary);
            width: 100%;
            color: var(--font-color);
        }

        &--submit {
            font-size: 0;
            background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iNyIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMjEgMjFMMTUgMTUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==') no-repeat;
            background-size: 100%;
            display: block;
            width: 24px;
            height: 24px;
            filter: invert(22%) sepia(100%) saturate(1800%) hue-rotate(199deg) brightness(97%) contrast(96%);
            cursor: pointer;
        }
    }

    &__utils {
        display: flex;

        @include desktop {
            justify-content: space-between;
            max-width: 140px;
            width: 100%;
        }

        &--search {
            display: none;
            @include desktop {
                display: block;
            }
        }

        &--user {
            @include mobile {
                display: none;
            }
        }

        &--menu {
            display: none;
            
            @include mobile {
                display: block;
            }
        }
    }
}
</style>