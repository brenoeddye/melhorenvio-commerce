import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { createFluentVue } from 'fluent-vue'
import brMessages from './languages/br.ftl?raw'
const brBundle = new FluentBundle('br')

import App from './App.vue'
import router from './router'

brBundle.addResource(new FluentResource(brMessages))

const fluent = createFluentVue({
  bundles: [brBundle]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(fluent)
app.use(VueLazyload)

app.config.globalProperties.$fluent = fluent;

app.mount('#app')
