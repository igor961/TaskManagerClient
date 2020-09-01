import { Client } from '@stomp/stompjs'


export default function plugin(url, cred={}) {
  const client = new Client({
    brokerURL: url,
    connectHeaders: cred
  })

  const service = {
    arr: [],
    register (vm) {
      this.arr.push(vm)
    }
  }

  client.onConnect = () => {
    service.arr.map(v => {
      console.log(v.$wsClient.connected)
      v.onConnect()
    })
    client.subscribe('/user/queue/reply', ()=>{})

    client.publish({
      destination: '/app/test',
      body: 'hi'
    })


    console.log("Connected")
  }

  const plugin = {
    install (Vue) {
      console.log("Connecting...")

      Vue.mixin({
        created () {
          if (this.$wsClient.connected) this.onConnect()
          else service.register(this)
        },
        methods: {
          onConnect () { 
          }
        }
      })

      Vue.prototype.$wsClient = client
      client.activate()
    }
  }
  return plugin
}
