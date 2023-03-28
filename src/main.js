import { createApp } from 'vue'
import { store } from '@/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import '@/styles/index.less'
import './iconfont/iconfont.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store)
app.mount('#app')
