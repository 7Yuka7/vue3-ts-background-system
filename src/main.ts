import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

//可以链式use(),最后是mount就可以
createApp(App).use(router).mount('#app')
