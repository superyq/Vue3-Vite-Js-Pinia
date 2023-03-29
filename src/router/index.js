import { createRouter, createWebHistory } from "vue-router";
import baseRouter from "./baseRouter";

// 构建路由 函数
const _createRouter = () =>
  createRouter({
    history: createWebHistory(),
    routes: baseRouter,
    scrollBehavior() {
      return {
        el: "#app",
        top: 0,
        behavior: "smooth",
      };
    },
  });

// 重置路由 函数
export const resetRouter = () => {
  const newRouter = _createRouter();
  router.matcher = newRouter.matcher;
};

const router = _createRouter();

export default router;
