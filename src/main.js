import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import Vue from "vue";
// import Vue from 'vue'

import router from './router'
import ElementPlus from 'element-plus'
import VCalendar from 'v-calendar';
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vue3TouchEvents from "vue3-touch-events";
import Maska from 'maska'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VCalendar, {})
app.use(VueAxios, axios)
app.use(Vue3TouchEvents);
app.use(Maska);
// Vue.use(Vue3TouchEvents);


app.mount('#app')
