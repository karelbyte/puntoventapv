import {getCurrentInstance} from 'vue'

export default function useAminDrawer() {
    const internalInstance = getCurrentInstance(); 
    const adminDrawer = internalInstance.appContext.config.globalProperties.$adminDrawer;
    return adminDrawer;
}