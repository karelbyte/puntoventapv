import { boot } from 'quasar/wrappers'
import mitt from 'mitt';

class Bus {
    constructor() {
        this.eventBus = mitt();
    }

    fire(event, data = null) {
      this.eventBus.emit(event, data)
    }

    listen(event, callback) {
        this.eventBus.on(event, callback)
    }

    unlisten(event, callback) {
        this.eventBus.of(event, callback)
    }
}

export default boot(({ app }) => {
  app.config.globalProperties.$emitter = new Bus()
})


