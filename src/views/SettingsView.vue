<template>
  <div>
    <v-text-field
      label="Period duration (in days)"
      type="number"
      v-model.number="periodDuration"
    ></v-text-field>

    <v-text-field
      label="Minimal duration between periods (in days)"
      type="number"
      v-model.number="minimalInterval"
    ></v-text-field>

    <v-text-field
      label="Maximal duration between periods (in days)"
      type="number"
      v-model.number="maximalInterval"
    ></v-text-field>
    <v-btn color="primary" @click="save">
      Save
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import store from "../store";

const periodDuration = ref(store.state.periodDuration);
const minimalInterval = ref(store.state.minimalInterval);
const maximalInterval = ref(store.state.maximalInterval);

function save() {
  store.dispatch("setSettings", {
    periodDuration,
    minimalInterval,
    maximalInterval,
  });
}
</script>
