import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PeriodsListView from "../views/PeriodsListView.vue";
import CalendarView from "../views/CalendarView.vue";
import SettingsView from "../views/SettingsView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/periodsList",
    name: "periodsList",
    component: PeriodsListView,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: CalendarView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
