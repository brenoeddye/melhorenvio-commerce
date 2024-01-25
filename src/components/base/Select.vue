<script lang="ts">
import { defineComponent } from 'vue'
import { type IMenu } from '@/core/types/menuTypes';

export default defineComponent({
    props: {
        placeholder: String,
        options: {
            type: Array as () => IMenu[],
            default: () => [],
        },
    },
    data() {
        return {
            actual: this.placeholder,
            showOptions: false,
        }
    },
    methods: {
        selectOption(option: IMenu) {
            this.actual = option.content;
            this.$emit('categorySelected', option.link);
        }
    }
})
</script>

<template>
    <div class="select" @click="showOptions = !showOptions">
        <h3>{{ actual }}</h3>
        <baseIcon 
            class="select__arrow"
            icon="arrow-down"
            width="30" height="30"
            colors="primary"
            clickable
        />

        <ul class="select__options" :class="{ active: showOptions }">
            <li class="select__options--title">
                <span>Categorias</span>
                <baseIcon 
                    icon="close"
                    width="24" height="24"
                    colors="primary"
                    clickable
                />
            </li>
            <li @click="selectOption(option)" v-for="option in options" :index="option">
                {{ option.content }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.select {
    background-color: var(--secondary);
    border: 1px solid var(--secondary-border);
    box-shadow: var(--box-shadow);
    display: flex;
    align-items: center;
    border-radius: 4px;
    max-width: 190px;
    position: relative;
    cursor: pointer;

    h3 {
        font-size: 16px;
        font-weight: 400;
        padding: 12px 34px 12px 12px;
    }

    &__arrow {
        border-left: 1px solid var(--secondary-border);
        padding: 8px;
    }

    &__options {
        background-color: var(--secondary);
        box-shadow: var(--box-shadow);
        visibility: hidden;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
        border-radius: 4px;
        padding: 3px 12px;
        transition: all .25s linear;
        z-index: $select-drop;

        &--title {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        li {
            padding: 4px 0;
            border-bottom: 1px solid var(--secondary-border);

            &:last-child {
                border-bottom: 0;
            }
        }

        &.active {
            top: 52px;
            visibility: visible;
            opacity: 1;
        }
    }
}
</style>