<template>
  <div>
    <portal :to="portalKey_">
      <q-card square class="q-pa-xs row justify-between">
        <div>
        <q-btn :disable="disableBtnClose_" flat round color="grey" icon="close" @click="adminDrawer.closeDrawer()" />
         {{title_.toUpperCase()}}
        </div>
        <q-btn color="primary" label="Guardar" @click="save" />
      </q-card>
    </portal>
    <q-card square class="q-mt-xs q-pa-sm card-full">
      <q-btn flat round @click="addDrawer()" label="new" />
    </q-card>
  </div>
</template>

<script>
import { ref, defineComponent, computed } from "vue";
import useEmitter from '../../composables/useEmitter'
import useAdminDrawer from '../../composables/useAdminDrawer'
export default defineComponent({
  props: {
    'portalKey': {
      value: String,
      default: ''
    },
    'title': {
      value: String,
      default: ''
    },
    'disableBtnClose': {
      value: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const adminDrawer = useAdminDrawer()
    const emitter = useEmitter()
    const disableBtnClose_ = computed(() => props.disableBtnClose)
    const portalKey_ = ref(props.portalKey)
    const title_ = ref(props.title);

    const save = () => {
      emitter.fire('create-measure', 'la prueba')
    }

    return {
      save,
      adminDrawer,
      disableBtnClose_,
      portalKey_,
      title_
    };
  },
});
</script>

<style scoped>
.card-full {
  height: calc(100vh - 55px);
}
</style>