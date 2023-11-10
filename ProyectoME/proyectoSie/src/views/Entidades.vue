<template class="">
    <main class="">
      <!-- Selec -->
      <SelectComponent @selected="handleSelectedEstado"></SelectComponent>
      <!-- Tabla Municipios -->
      <TableMunicipio :municipios="paginatedMunipios" :selected="selectedEstado"></TableMunicipio>
      <!-- Paginacion  -->
      <section class="container px-4 mx-auto">
        <div class="flex items-center justify-between mt-6 mb-6">
          <button :disabled="page <= 1" :class="{ 'opacity-50': page <= 1 }" @click="changePage(page - 1)"
            class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="w-5 h-5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>
              Anterior
            </span>
          </button>
          <div class="flex">
            <!-- rango -->
            <select id="rango" v-model="itemsPerPage"
              class="bg-gray-50 border mx-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="6" class="text-gray-500">6</option>
              <option value="12" class="text-gray-500">12</option>
              <option value="24" class="text-gray-500">24</option>
              <option value="48" class="text-gray-500">48</option>
            </select>
            <button :disabled="page >= totalItems / itemsPerPage"
              :class="{ 'opacity-50': page >= totalItems / itemsPerPage }" @click="changePage(page + 1)"
              class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ">
              <span>
                Siguiente
              </span>
  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
  
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import SelectComponent from '@/components/SelecEstado.vue';
  import TableMunicipio from '@/components/TableMunicipio.vue';
  import axiosCliente from '@/utils/axios';
  import { Municipio } from '@/models/municipios.model';
  
  
  const selectedEstado = ref<number>(0); // selectedEstado con null
  const municipios = ref<Municipio[]>([]);
  
  
  //paginacion
  const page = ref(1);
  const totalItems = ref(0);
  const itemsPerPage = ref(6);
  const paginatedMunipios = ref<Municipio[]>([]);
  
  const handleSelectedEstado = (estado_id: number) => {
    // Realizar una solicitud HTTP para obtener los municipios por estado_id
    axiosCliente.get(`/municipio/por_estado/${estado_id}/`)
      .then(response => {
        municipios.value = response.data;
        selectedEstado.value = estado_id; // Actualizar la lista de municipios
        totalItems.value = municipios.value.length;
      })
      .catch(error => {
        console.error('Error al obtener municipios:', error);
      });
  };
  
  
  const sliceMunipios = (currentCountries: Municipio[]) => {
    const start = (page.value - 1) * itemsPerPage.value;
    const end = page.value * itemsPerPage.value;
    paginatedMunipios.value = currentCountries.slice(start, end);
  };
  
  
  const changePage = (newPage: number) => {
    page.value = newPage;
  };
  
  
  
  watch([municipios, page], () => {
    sliceMunipios(municipios.value);
  });
  
  watch(itemsPerPage, (newVal) => {
    sliceMunipios(municipios.value); // Actualiza la paginación basada en el nuevo valor de itemsPerPage
  });
  
  </script>
  