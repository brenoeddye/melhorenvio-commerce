<script lang="ts">
import menuData from '../../core/data/menuData';
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            menuData: menuData
        }
    }
})
</script>

<template>
    <header class="header">
        <div class="container">
            <div class="header__profile">
                <h3 class="header__profile--username">{{ $t('header-username') }}</h3>
                <p class="header__profile--address">{{ $t('header-address') }}</p>
            </div>
            <nav class="header__navbar">
                <ul>
                    <li class="header__navbar--title">
                        {{ $t('header-navbar-title') }}
                    </li>
                    <li v-for="(item, index) in menuData" :key="index">
                        <a :href="item.link" :target="item.isNewTab ? '_blank' : ''"> {{ $t(item.content) }}</a>
                    </li>
                </ul>
            </nav>
            <div class="header__search">
                <div class="container">
                    <form class="header__search--form">
                        <input class="header__search--input" type="text" placeholder="Busque seu produto">
                        <input class="header__search--submit" type="submit" value="Search">
                    </form>
                </div>
            </div>
            <div class="header__search--shortcut">
                <baseIcon icon="search" colors="primary" />
            </div>
            <div class="header__utils">
                <baseIcon icon="cart" width="36.26" height="36.26" colors="primary"/>
                <baseIcon icon="user" width="36.26" height="36.26" colors="primary"/>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    background-color: var(--secondary);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    padding: 20px 0;
    z-index: $header;

    & > .container {
        @include container;
        display: flex;
        align-items: center;
        justify-content: space-between;
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

    &__navbar ul {
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

            &.header__navbar--title {
                @include tablet {
                    display: none;
                }
                @include desktop {
                    display: none;
                }
            }
        }
    }

    &__search {
        background-color: var(--secondary);
        padding-bottom: 8px;
        
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

        &--input {
            @include phone {
                width: 100%;
            }
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
    }
}
</style>