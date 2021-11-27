<template>
  <div class="q-ma-md">
    <q-card>
      <q-card-section>
        <q-input dense outlined style="width: 300px" label="Buscar"></q-input>
      </q-card-section>
      <q-card-section>
        <q-table :rows="items" :columns="columns" row-key="name" flat>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                dense
                icon="mode_edit"
                color="green"
                @click="showEditItem(props.row)"
                class="q-mr-sm"
              ></q-btn>
              <q-btn
                flat
                dense
                icon="delete"
                color="red"
                @click="showDeleteItem(props.row)"
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="blue" @click="openAddDrawer()"/>
    </q-page-sticky>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import MeasureService from "../services/MeasuresService";
import useAdminDrawer from '../composables/useAdminDrawer'
import useEmitter from '../composables/useEmitter'
import itemsManager from '../composables/index'
export default defineComponent({
  name: "Measures",
  setup() {
    const adminDrawer = useAdminDrawer()
    const emitter = useEmitter()
    const items = ref([]);
    const columns = [
      {
        name: "name",
        required: true,
        label: "NOMBRE",
        align: "left",
        field: (row) => row.description,
        format: (val) => `${val}`,
        sortable: true,
      },
      { name: "actions", label: "", field: "" },
    ];

    const getItems = async () => {
      items.value = await MeasureService.index();
    };

    const openAddDrawer = () => {
      adminDrawer.addDrawer('MeasureCreate', {title: 'Añadir unidad de medida'}, 650)
    } 

    const showEditItem = (item) => {};
    const showDeleteItem = (item) => {};

    onMounted(() => {
        getItems()
       /* emitter.listen('create-measure', addItem);  
        emitter.listen('update-measure', updateItem);
        emitter.listen('delete-measure', deleteItem);  */
    });

    onBeforeUnmount(() => {
      /* emitter.unlisten('create-measure', addItem);  
       emitter.unlisten('update-measure', updateItem);
       emitter.unlisten('delete-measure', deleteItem);  */
    })

    return {
      items,
      columns,
      showEditItem,
      showDeleteItem,
      openAddDrawer
    };
  },
});
</script>
