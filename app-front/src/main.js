import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleCharts from 'vue-google-charts'


const app = createApp(App)

app.use(VueGoogleCharts)
app.use(router)

app.mount('#app')
