import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import WSPlugin from './service'

Vue.config.productionTip = false

Vue.use(Vuelidate)

//Vue.use(WSPlugin("ws://taskmanagerws.herokuapp.com/api"))
Vue.use(WSPlugin("ws://localhost:8080/api"))

new Vue({
  render: h => h(App),
}).$mount('#app')
