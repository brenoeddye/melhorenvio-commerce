<script lang="ts">
import { defineComponent } from 'vue'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { createFluentVue } from 'fluent-vue'

import enMessages from './languages/en.ftl?raw'
import brMessages from './languages/br.ftl?raw'

export default defineComponent({
  data() {
    return {
      enBundle: new FluentBundle('en'),
      brBundle: new FluentBundle('br')
    }
  },
})
</script>

<template>
  <layoutHeader />
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