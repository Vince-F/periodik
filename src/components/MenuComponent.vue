<template>
  <v-list>
    <v-list-item link to="/periodsList">
      <v-list-item-icon>
        <v-icon>mdi-format-list-checkbox </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>Periods list</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/settings">
      <v-list-item-icon>
        <v-icon>mdi-clipboard-clock-outline </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>Cycles</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/calendar">
      <v-list-item-icon>
        <v-icon>mdi-calendar</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>Calendar</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
