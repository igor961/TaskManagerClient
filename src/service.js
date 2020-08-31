import { Client } from '@stomp/stompjs'

export default function plugin(url, cred={}) {
  const client = new Client({
    brokerURL: url,
    connectHeaders: cred
  })

  const plugin = {
    install (Vue) {
      console.log("Connecting...")
      const aux = {
        created () {
          client.onConnect = () => {
            console.log("Connected")
            this.onConnect()
          }
        }
      }

      Vue.mixin(aux)

      Vue.prototype.$wsClient = client
      client.activate()
    }
  }

  return plugin
}
