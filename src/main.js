import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import * as PIXI from 'pixi.js'
require("pixi-sound");
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app')