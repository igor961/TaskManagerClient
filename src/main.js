import Vue from 'vue'
import App from './App.vue'
import WSPlugin from './service'

Vue.config.productionTip = false

Vue.use(WSPlugin("ws://localhost:8080/api"))

new Vue({
  render: h => h(App),
}).$mount('#app')
