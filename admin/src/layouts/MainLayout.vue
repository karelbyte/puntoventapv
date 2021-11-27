
<template>
  <q-layout view="hHr lpR fFr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
         <!--  <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->
          TPV - PV
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <drawer-manager/>
    
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <Menu/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref, watch } from 'vue'
import DrawerManager from './DrawerManager.vue'
import Menu from './Menu.vue'
import { useStore } from "vuex";
export default {
  components: {
    DrawerManager, Menu
  },
  setup () {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleRightDrawer () {  
       adminDrawer.addDrawer('MeasureCreate', {title: 'drawer test'}, 650)
      }
    }
  }
}
</script>
