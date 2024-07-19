import { createApp } from 'vue'
import App from './App.vue'
import  '@/style/reset.scss'


import Top from '@/components/top/index.vue';
import Bottom from '@/components/bottom/index.vue';


import ElementPlus from 'element-plus'
import router   from "@/router";
import 'element-plus/dist/index.css'


const app =  createApp(App);
app.component('Top',Top)
app.component('Bottom',Bottom)

app.use(ElementPlus)
app.use(router)
app.mount('#app')