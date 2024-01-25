<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            dataTheme: document.documentElement.getAttribute('data-theme') || document.documentElement.setAttribute('data-theme', 'dark')
        }
    },
    mounted() {
        const theme = localStorage.getItem('data-theme') ?? 'light';
        document.documentElement.setAttribute('data-theme', theme);
    },
    watch: {
      dataTheme(newTheme) {
          localStorage.setItem('data-theme', newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
      }
    }
})
</script>

<template>
  <layoutHeader @changeTheme="dataTheme == 'dark' ? dataTheme = 'light' : dataTheme = 'dark'"/>
  <RouterView />
</template>

<style lang="scss">
body {
  font-family: $primary-font;
  background-color: var(--body-background);
  color: var(--font-color);
  transition: all .3s linear;
}
</style>