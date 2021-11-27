<template>
  <q-drawer
    v-for="(drawer, index) in drawers"
    :key="index"
    v-model="visibles[index]"
    side="right"
    behavior="desktop"
    elevated
    overlay
    show-if-above
    :width="drawer.width"
  >
    <div>
        <portal-target :name="`drawer${index}`" />
    </div>
    <component :is="drawer.component" v-bind="drawer.props" :portal-key="`drawer${index}`" :disable-btn-close="drawer.disableBtnClose"/>
  </q-drawer>
</template>

<script>
import { ref, computed, watch, } from "vue";
import { useStore } from "vuex";
export default {
  name: "DrawerManager",
  setup() {
    const store = useStore();

    const drawers = computed(() => {

      let drawers = JSON.parse(JSON.stringify(store.getters['drawers/getDrawers']));

      drawers = drawers.map((drawer, index) => {
        drawer.disableBtnClose = drawers.length != index + 1
        return drawer;
      });

      drawers = drawers.reverse();

      drawers = drawers.map((drawer, index) => {
        if (index > 0) {
          let widthBefore = drawers[index - 1].width;
          drawer.width = widthBefore + 50;
        } 
        return drawer;
      });

      return drawers.reverse();
    });

    var visibles = ref([]);

    watch(store.state.drawers.drawers, (drawers) => {
    visibles.value = drawers.map((drawer, index) => {
          if (visibles.value[index] !== undefined) {
            return visibles.value[index];
          }
          return true;
        })
    })

    return {
      visibles,
      drawers,
    };
  },
};
</script>
