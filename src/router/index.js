import { createRouter, createWebHistory } from "vue-router";
import baseRouter from "./baseRouter";
import { getToken } from "@/utils/auth.js";

let token = getToken();
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

// router.beforeEach((to, from, next) => {
//   if (to.name == "login") {
//   }
//   if (!!token) {
//     console.log("登录");
//     next();
//   } else {
//     console.log("没登陆");
//     next({ name: "login" });
//   }
// });

export default router;
