<template>
  <section class="max-w-2xl mx-auto my-3">
    <label for="states" class="block mb-2 text-sm font-medium text-gray-900"
      >Selecciona un estado</label
    >
    <select
      id="states"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      v-model="selectedEstado"
      @change="emitSelectedEstado"
    >
      <option value="" default>Selecciona un estado</option>
      <option v-for="estado in estados" :key="estado.id" :value="estado.id">
        {{ estado.nombre }}
      </option>
    </select>
  </section>
</template>

<script setup lang="ts">
import axiosCliente from "../utils/axios.ts";
import { onMounted,ref, defineProps, defineEmits  } from "vue";

const estados=ref([])
const selectedEstado = ref(defineProps().selectedValue);

// Define un tipo para selectedValue, por ejemplo, si es de tipo string
const props = defineProps<{
  selectedValue: string;
}>();
const { emit } = defineEmits();

const emitSelectedEstado = () => {
  emit("update:selectedValue", selectedEstado.value);
};
const fetchEstados = async () => {
  try {
    const { data } = await axiosCliente.get('/');
    estados.value=data;
    console.log(estados.value);
    
  } catch (error) {
    console.log(error);
    
  }
};
onMounted(() => {
  fetchEstados();
});


</script>


<!-- 
v-model="selectedEstado"
@change="emitSelectedEstado" -->