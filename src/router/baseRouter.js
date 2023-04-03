export default [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/forget",
    name: "forget",
    component: () => import("@/views/forget.vue"),
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import("@/views/demo.vue"),
  },
  {
    path: "",
    component: () => import("@/views/layout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home.vue"),
      },
    ],
  },
];
