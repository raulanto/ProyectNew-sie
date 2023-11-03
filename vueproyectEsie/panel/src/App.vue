<template>
  <v-container>
    <v-responsive>
      <v-row>
        <v-col>
          <v-select :items="items" density="compact" label="Compact"></v-select>
        </v-col>
      </v-row>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-center">Estado</th>
            <th class="text-center">Municipio</th>
            <th class="text-center">Codigo</th>
            <th class="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td class="text-center">{{ item.calories }}</td>
            <td class="text-center">{{ item.calories }}</td>
            <td class="text-center">
              <v-chip draggable color="green" text-color="white"> Code </v-chip>
            </td>
            <td class="text-center">
              <v-btn variant="tonal" color="red-darken-1"> Eliminar </v-btn>
            </td>

          </tr>
          <tr>
            <td colspan="5e">
              <v-row no-gutters>
                <v-col >
                  <v-sheet class="pa-2 ma-2">
                    <v-text-field label="Main input" :rules="rules" hide-details="auto"></v-text-field>
                  </v-sheet>
                </v-col>
                <v-col cols="2" align-self="center">
                  <v-sheet class="pa-2 ma-2 " items="center">
                    <v-btn variant="tonal" color="green-darken-1"> Agregar </v-btn>
                  </v-sheet>
                </v-col>
              </v-row>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-pagination :length="4"></v-pagination>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
      ],
    };
  },
};
</script>
