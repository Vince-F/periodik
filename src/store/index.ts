import Vue from "vue";
import Vuex from "vuex";
import * as localforage from "localforage";

Vue.use(Vuex);

type Period = { startDate: Date, endDate: Date };

export default new Vuex.Store({
  state: {
    periods: [] as Array<Period>,
    periodDuration: 0,
    minimalInterval: 0,
    maximalInterval: 0,
  },
  getters: {
    latestPeriod(state) {
      let latestPeriod: Period | null = null;
      state.periods.forEach((period) => {
        if (latestPeriod === null || period.endDate.getTime() > latestPeriod.endDate.getTime()) {
          latestPeriod = period;
        }
      });
      return latestPeriod;
    },
  },
  mutations: {
    addPeriod(state, payload: Period) {
      state.periods.push(payload);
    },
    removePeriod(state, payload: Period) {
      const idx = state.periods.indexOf(payload);
      if (idx > -1) {
        state.periods.splice(idx, 1);
      }
    },
    setSettings(
      state,
      payload: { periodDuration: number, minimalInterval: number, maximalInterval: number },
    ) {
      state.periodDuration = payload.periodDuration;
      state.minimalInterval = payload.minimalInterval;
      state.maximalInterval = payload.maximalInterval;
    },
  },
  actions: {
    loadData(context) {
      return Promise.all([
        localforage.getItem("periods"),
        localforage.getItem("periodDuration"),
        localforage.getItem("minimalInterval"),
        localforage.getItem("maximalInterval"),
      ])
        .then((values) => {
          const periods: Period[] = values[0] as Period[];
          const periodDuration: number = values[1] as number ?? 0;
          const minimalInterval: number = values[2] as number ?? 0;
          const maximalInterval: number = values[3] as number ?? 0;
          context.commit("setSettings", {
            periodDuration,
            minimalInterval,
            maximalInterval,
          });
          if (Array.isArray(periods)) {
            periods.forEach((period) => {
              context.commit("addPeriod", period);
            });
          }
        });
    },
    saveData(context) {
      localforage.setItem("periods", context.state.periods);
      localforage.setItem("periodDuration", context.state.periodDuration);
      localforage.setItem("minimalInterval", context.state.minimalInterval);
      localforage.setItem("maximalInterval", context.state.maximalInterval);
    },
    addPeriod(context, payload: Period) {
      context.commit("addPeriod", payload);
      context.dispatch("saveData");
    },
    removePeriod(context, payload: Period) {
      context.commit("removePeriod", payload);
      context.dispatch("saveData");
    },
    setSettings(
      context,
      payload: { periodDuration: number, minimalInterval: number, maximalInterval: number },
    ) {
      context.commit("setSettings", payload);
      context.dispatch("saveData");
    },
  },
  modules: {
  },
});
