import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import baseRouter from "./baseRouter";
import { getToken } from "@/utils/auth.js";

NProgress.configure({ showSpinner: false });

// 判断是否登录
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

const whiteList = ["login", "forget", "demo"];

router.beforeEach((to) => {
  NProgress.start();
  // 未登录，跳转登录页或白名单
  if (!token && whiteList.indexOf(to.name) == -1) {
    return { name: "login" };
  }
  // 登录后l跳转login页，重定向到home页
  if (!!token && to.name == "login") {
    return { name: "home" };
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
