import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import TaskList from "@/views/TaskList.vue";
import { isAuthenticated } from "@/services/auth";

const routes = [
  { path: "/", component: LoginView },
  {
    path: "/tasks",
    component: TaskList,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/");
  } else {
    next();
  }
});

export default router;
