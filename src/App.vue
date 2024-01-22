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
  methods: {
    changeLanguage() {
      this.enBundle.addResource(new FluentResource(enMessages))
      this.brBundle.addResource(new FluentResource(brMessages))

      var newFluent = createFluentVue({
        bundles: [this.enBundle]
      });

      this.$fluent.bundles = newFluent.bundles;
    },
  }
})
</script>

<template>
  <RouterView />
</template>