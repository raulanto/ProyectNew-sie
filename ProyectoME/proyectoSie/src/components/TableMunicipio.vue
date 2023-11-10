<template>
    <section class="container px-4 mx-auto">
        <div class="flex flex-col">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200  md:rounded-lg">
                        <!-- tabla de municipios -->
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        <div class="flex items-center gap-x-3">
                                            <button class="flex items-center gap-x-2">
                                                <span>ID</span>
                                            </button>
                                        </div>
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Estado
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Municipio
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Codigo
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Opciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr class="">

                                    <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" colspan="5e">
                                        <div class="mb-4 flex items-center ">
                                            <input id="MP" class="w-full rounded-lg border border-gray-400 p-2"  @input="validateText"
                                                placeholder="Municipio.." type="text" v-model="nuevoMunicipio" />

                                            <button @click="agregarMunicipio"
                                                class="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600">Agregar</button>
                                        </div>
                                        <div class="text-red-600" v-if="municipioAgregado">
                                            Error al agregar el municipio. Verifica que no exista previamente.
                                        </div>
                                        <div class="text-emerald-600" v-if="municipioNoAgregado">
                                            Municipio agregado
                                        </div>
                                        <div class="text-red-600" v-if="ingresealgo">
                                           Ingrese algo
                                        </div>
                                    </td>
                                </tr>

                                <tr v-for="municipio in municipios" :key="municipio.id">
                                    <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div class="inline-flex items-center gap-x-3">
                                            <span>#{{ municipio.id }}</span>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{
                                        municipio.estado_nombre
                                    }}</td>
                                    <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{{ municipio.nombre }}
                                    </td>
                                    <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div v-if="municipio.codigo"
                                            class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                                            <h2 class="text-sm font-normal">{{ municipio.codigo }}</h2>
                                        </div>
                                        <div v-else
                                            class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 ">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5"
                                                    stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <h2 class="text-sm font-normal">null</h2>
                                        </div>
                                    </td>


                                    <td>
                                        <button @click="eliminarMunicipio(municipio)"
                                            class="ml-2 rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 px-4 py-1">Eliminar</button>
                                    </td>
                                </tr>
                                <tr>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>


<script setup  lang="ts">
import { ref, type PropType } from 'vue';
import { defineProps, toRefs } from 'vue';
import axiosCliente from '@/utils/axios';
import { Municipio } from '@/models/municipios.model';

const municipioAgregado = ref(false); // mensaje de éxito
const municipioNoAgregado = ref(false); // mensaje de error
// const selected = ref<number>(0); // selected con null
const nuevoMunicipio = ref<string>(''); // l nuevo municipio
const ingresealgo  = ref(false);
const props = defineProps({
    selected: Number,
    //   municipios: Array as PropType<Municipio[]>,
    municipios: Array as () => Municipio[],
});

const { selected } = toRefs(props);
const { municipios }= toRefs(props);


const agregarMunicipio = () => {
    const municipioData = {
        nombre: nuevoMunicipio.value,
        estado: selected.value,
    };
    municipioNoAgregado.value = false;
    municipioAgregado.value = false;
    ingresealgo.value=false;
    if (selected.value && nuevoMunicipio.value) {
        axiosCliente.get(`/municipio/por_estado/${selected.value}/`)
            .then(response => {
                const municipiosExistentes = response.data;
                const municipioExistente = municipiosExistentes.find(
                    municipio => municipio.nombre.toLowerCase() === nuevoMunicipio.value.toLowerCase() &&
                        municipio.estado === selected.value
                );

                if (municipioExistente) {
                    console.log('El municipio ya existe en la lista y tiene una relación con el estado seleccionado.');
                    municipioAgregado.value = true;
                    municipioNoAgregado.value = false;
                } else {
                    axiosCliente.post('/municipio/', municipioData)
                        .then(response => {
                            console.log('Municipio agregado:', response.data);
                            municipioAgregado.value = false;
                            municipioNoAgregado.value = true;
                            municipios.value.push(response.data);
                        })
                        .catch(error => {
                            console.error('Error al agregar municipio:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error al comprobar municipios:', error);
            });
    } else {
        console.log('ingresar un muncipio válido antes de agregar.');
        ingresealgo.value = true;
    }
};

const eliminarMunicipio = (municipio: Municipio) => {
    const municipioIndex = municipios.value.findIndex(m => m.id === municipio.id);

    if (municipioIndex !== -1) {
        const municipioId = municipio.id;
        axiosCliente.delete(`/municipio/${municipioId}`)
            .then(() => {
                municipios.value = municipios.value.filter((m, index) => index !== municipioIndex);
                console.log('Municipio eliminado correctamente.');
            })
            .catch(error => {
                console.error('Error municipio:', error);
            });
    } else {
        console.log('no se encontró en la lista de municipios.');
    }
};

const validateText = () => {
    nuevoMunicipio.value = nuevoMunicipio.value.replace(/[^A-Za-z\s]/g, '');
};
</script>