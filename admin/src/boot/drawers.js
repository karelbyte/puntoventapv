import { boot } from 'quasar/wrappers'
import Portal from 'vue3-portal';

class AdminDrawer {

    constructor(store) {
        this.store = store
    }
    
    addDrawer(component, props, width, classes = null) {
        let drawer = {
            component: component,
            props: props,
            width: width,
            classes: classes
        }
       this.store.commit('drawers/addDrawer', drawer) 
    }

    closeDrawer() {
        this.store.commit('drawers/closeDrawer') 
    }
}

export default boot(({ app, store }) => { 
  app.config.globalProperties.$adminDrawer = new AdminDrawer(store)
  app.use(Portal)
})