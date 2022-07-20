<template>
  <div>
    <div class="d-flex">
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        :items="types"
        v-model="type"
        label="Calendar type"
        outlined
      ></v-select>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <v-sheet height="600">
      <h1>{{month}}/{{year}}</h1>
      <v-calendar ref="calendar" :weekdays="[1, 2, 3, 4, 5, 6, 0]" :type="type"
        :events="events" :event-overlap-threshold="30"
        :event-color="getEventColor" @change="updateMonth"
        v-model="calendarValue">
      </v-calendar>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import store from "../store";

const types = ref(["month", "week"]);
const type = ref("month");
const month = ref("");
const year = ref("");

const calendarValue = ref("");

const periods = computed(() => store.state.periods.map((period) => ({
  name: "",
  start: period.startDate,
  end: period.endDate,
  timed: false,
  color: "red",
})));

function createPredictionEvent(baseDate: Date, i: number, prefix = "") {
  const startDate = new Date(baseDate.getTime());
  startDate.setDate(startDate.getDate() + i);
  const endDate = new Date(startDate.getTime());
  endDate.setDate(endDate.getDate() + store.state.periodDuration);
  return {
    name: `${prefix} +${i}`,
    start: startDate,
    end: endDate,
    timed: false,
    color: "orange",
  };
}

const futuresPeriods = computed(() => {
  const lastDate = store.getters.latestPeriod;
  const firstRoundPredictions = [];
  // first round of predictions
  if (lastDate) {
    for (let i = store.state.minimalInterval; i <= store.state.maximalInterval; i++) {
      firstRoundPredictions.push(createPredictionEvent(lastDate.endDate, i));
    }
  }
  const secondRoundPredictions = [];
  firstRoundPredictions.forEach((event) => {
    for (let i = store.state.minimalInterval; i <= store.state.maximalInterval; i++) {
      secondRoundPredictions.push(createPredictionEvent(event.end, i, event.name));
    }
  });
  return [].concat(firstRoundPredictions, secondRoundPredictions);
});

const events = computed(() => [].concat(periods.value, futuresPeriods.value));

function getEventColor(event) {
  return event.color;
}

function updateMonth(event) {
  month.value = event.start.month;
  year.value = event.start.year;
}

</script>
