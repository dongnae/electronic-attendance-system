import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";

axios.interceptors.response.use(a => a, err => err.response);

createApp(App).use(store).use(router).mount('#app')
