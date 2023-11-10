<template>
  <section class="max-w-2xl mx-auto my-3">
    <label for="states" class="block mb-2 text-sm font-medium text-gray-900">Selecciona un estado</label>
    <select id="states"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      v-model="selectedEstadoId"
      @change="emitSelectedEstado"
      placeholder="Estados"
    >
      <option value="" disabled default select>Selecciona un estado</option>
      <option v-for="estado in estados" :key="estado.id" :value="estado.id">{{ estado.nombre }}</option>
    </select>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue';
import axiosCliente from '@/utils/axios';
import { Estado } from '@/models/Estado.model';

export default {
  props: {
    selectedValue: Number, // Asegúrate de que el tipo sea correcto
  },
  setup(props, { emit }) {
    const selectedEstadoId = ref(props.selectedValue);
    const estados = ref<Estado[]>([]);

    const fetchEstados = async () => {
      try {
        const { data } = await axiosCliente.get('/estado'); // Asegúrate de que la URL sea la correcta
        estados.value = data; // Asigna la lista de estados correctamente
      } catch (error) {
        console.error('Error al cargar los estados', error); // Manejo de errores
      }
    };

    const emitSelectedEstado = () => {
      emit('selected', selectedEstadoId.value);
    };

    fetchEstados();

    return {
      selectedEstadoId,
      estados,
      emitSelectedEstado,
    };
  },
};
</script>
