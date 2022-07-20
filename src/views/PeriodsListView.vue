<template>
  <div>
    <v-list>
      <template v-for="(entry, index) in periods">
        <v-list-item :key="'item_' + index">
          <v-list-item-content>
            <v-list-item-title>
              {{ entry.startDate.toLocaleDateString() }} - {{ entry.endDate.toLocaleDateString() }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removePeriod(entry)">
              <v-icon color="grey lighten-1">mdi-delete-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="'divider_' + index" />
      </template>
    </v-list>
    <div class="new-area">
      <v-dialog
        ref="startDialog"
        v-model="startModal"
        :return-value.sync="startDate"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="startDate"
            label="Start date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="startDate"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="startModal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.startDialog.save(startDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-dialog
        ref="endDialog"
        v-model="endModal"
        :return-value.sync="endDate"
        persistent
        width="290px"
      >
      <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="endDate"
            label="End date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="endDate"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="endModal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.endDialog.save(endDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-btn color="primary" @click="addPeriod" >Add</v-btn>
    </div>
  </div>
</template>

<style scoped>
.new-area {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.new-area > * {
  flex: 1;
}
</style>

<script lang="ts" setup>
import { ref, computed, Ref } from "vue";
import store from "../store";

const startDate: Ref<string> | Ref<null> = ref(null);
const endDate: Ref<string> | Ref<null> = ref(null);
const startModal = ref(false);
const endModal = ref(false);

const periods = computed(() => store.state.periods);

function addPeriod() {
  if (startDate.value && endDate.value) {
    const startDateInstace = new Date(startDate.value);
    const endDateInstance = new Date(endDate.value);
    if (startDateInstace.getTime() < endDateInstance.getTime()) {
      store.dispatch("addPeriod", { startDate: startDateInstace, endDate: endDateInstance });
    }
  }
}

function removePeriod(entry) {
  store.dispatch("removePeriod", entry);
}
</script>
