<template>
  <q-list bordered separator>
      <span v-for="(item, index) in owners" :key="item.id">
      <q-item   
        clickable v-ripple
        :active="active == item.id"
        active-class="bg-blue-2 text-grey-8"
        @click="select(item)"
        v-if="item.type == 'single'"
      >
        <q-item-section avatar><q-icon color="blue-grey-7" :name="item.icon"/></q-item-section>
        <q-item-section ><span class="text-blue-grey-7">{{item.description}}</span></q-item-section>
      </q-item>
       <q-expansion-item v-else
        :icon="item.icon"
        :label="item.description"
         header-class="text-blue-grey-7"
        >
        <q-card>
          <span v-for="children in chidrens(item.id)" :key="children.id">
            <q-item  
             clickable v-ripple
             :active="active == children.id"
             active-class="bg-blue-2 text-grey-8"
             @click="select(children)" 
             >
             <q-item-section avatar class="q-ml-sm"><q-icon color="blue-grey-7" :name="children.icon"/></q-item-section>
             <q-item-section ><span class="text-blue-grey-7">{{children.description}}</span></q-item-section>
           </q-item>
          
          </span>
          
        </q-card>
      </q-expansion-item>
      <q-separator v-if="index !== owners.length-1"/>
     </span>
    </q-list>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Menu',
  setup(prop, context) {

    const router = useRouter()

    const list = [
       {id: 3, type: 'single', owner: 0, description: 'Clientes', icon: 'fa fa-users', patch: ''},
       {id: 6, type: 'multiple', owner: 0, description: 'Almacenes', icon: 'fa fa-pallet', patch: ''},
       {id: 8, type: 'multiple', owner: 6, description: 'Medidas', icon: 'fa fa-weight', patch: '/medidas'},
       {id: 9, type: 'multiple', owner: 6, description: 'Proveedores', icon: 'fa fa-box-open', patch: ''},
       {id: 10, type: 'multiple', owner: 6, description: 'Catalogo de producto', icon: 'fa fa-boxes', patch: ''},
       {id: 11, type: 'multiple', owner: 6, description: 'Pedidos', icon: 'fa fa-th', patch: ''},
       {id: 12, type: 'multiple', owner: 6, description: 'Recepciones', icon: 'fa fa-folder-plus', patch: ''},
       {id: 13, type: 'multiple', owner: 6, description: 'Inventario', icon: 'fa fa-layer-group', patch: ''},
       {id: 14, type: 'multiple', owner: 6, description: 'Ajustes de inventario', icon: 'fa fa-eraser', patch: ''},
       {id: 16, type: 'single', owner: 0, description: 'Usuarios', icon: 'fa fa-user-lock', patch: ''},
       {id: 18, type: 'single', owner: 0, description: 'Configuraciones', icon: 'fa fa-cog', patch: ''},
    ]

    let active = ref(0)

    const owners = computed(() => list.filter(item => item.owner == 0))

    const chidrens = (owner) => list.filter(item => item.owner == owner)

    const select = (item) => {
       active.value = item.id
       router.replace({
        path: item.patch
      })
    }
    
    return {
       select,
       chidrens,
       active,
       owners
    }
  }
})
</script>