import { createRouter, createWebHistory } from "vue-router";
import ClassifierView from "@/views/ClassifierView.vue";
import PoseView from "@/views/PoseView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: ClassifierView },
    { path: "/pose", name: "pose", component: PoseView },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;
