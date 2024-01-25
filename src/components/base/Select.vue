<script lang="ts">
import { defineComponent } from 'vue'
import { type IMenu } from '@/core/types/menuTypes';

export default defineComponent({
    props: {
        placeholder: String,
        options: {
            type: Object as () => IMenu,
            default: () => ({} as IMenu),
        },
    },
    data() {
        return {
            actual: this.placeholder,
            showOptions: false,
        }
    },
    methods: {
        isMenu(option: any): option is IMenu {
            return option && typeof option === 'object' && 'content' in option;
        },
    }
})
</script>

<template>
    <div class="select" @click="showOptions = !showOptions">
        <span>{{ actual }}</span>
        <baseIcon 
            class="select__arrow"
            icon="arrow-down"
            width="30" height="30"
            colors="primary"
            clickable
        />

        <ul class="select__options" :class="{ active: showOptions }">
            <li @click="actual = isMenu(option) ? option.content : 'Invalid Option'" v-for="option in options" :index="option">
                {{ isMenu(option) ? option.content : 'Invalid Option' }}
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

    span {
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
        width: 189px;
        border-radius: 4px;
        padding: 3px 12px;
        transition: all .25s linear;
        z-index: $select-drop;

        li {
            padding: 4px 0;
        }

        &.active {
            top: 42px;
            visibility: visible;
            opacity: 1;
        }
    }
}
</style>