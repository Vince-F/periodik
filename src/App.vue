<template>
  <v-app>
    <v-app-bar
      app
      color="purple"
      dark
      dense
    >
      <div class="d-flex align-center">
        <v-btn @click="drawerOpened = !drawerOpened" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        PERIODIK
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-navigation-drawer
        v-model="drawerOpened"
        absolute
        temporary
      >
        <MenuComponent />
      </v-navigation-drawer>
      <div v-if="!loading" class="content">
        <router-view />
      </div>
      <div v-else>
        Loading...
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.content {
  padding: 1rem;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import MenuComponent from "./components/MenuComponent.vue";
import store from "./store";

const drawerOpened = ref(false);
const loading = ref(true);
store.dispatch("loadData")
  .then(() => {
    loading.value = false;
  });
</script>
