import { createMemoryHistory, createRouter } from "vue-router";
import Login from "../pages/Login.vue";
import Chat from "../pages/Chat.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/chat", component: Chat },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
