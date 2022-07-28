import { createApp } from 'vue'
import App from './App.vue';
import router from './routers/index';
import store from './stores/store';

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

import Echo from "laravel-echo"
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://127.0.0.1' + ':6001',
    // auth: {
    //     headers: {
    //         Authorization: 'Bearer 34dff118444ef9aad77cdfdfaab96000'
    //     }
    // },
    // transports: ['websocket', 'polling', 'flashsocket']
});

// register globally

import QrcodeVue from 'qrcode.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import mitt from 'mitt'

import { VueMasonryPlugin } from "vue-masonry/src/masonry.plugin";
const emitter = mitt()

let app = createApp(App);

app.use(router);
app.use(store);
app.component('QuillEditor', QuillEditor);
app.component('QrcodeVue', QrcodeVue);
app.use(VueAxios, axios)
app.config.globalProperties.emitter = emitter
app.use(VueMasonryPlugin)
app.mount('#app');
