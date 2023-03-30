export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
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
