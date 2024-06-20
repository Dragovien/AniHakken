
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "IndexPage",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "threeJS",
        name: "ThreeJSPage",
        component: () => import("pages/ThreeJSPage.vue"),
      },
      {
        path: "login",
        name: "LoginPage",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "register",
        name: "RegisterPage",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "forgot-password",
        name: "ForgottenPasswordPage",
        component: () => import("pages/ForgottenPasswordPage.vue"),
      },
    ],
  },
  {
    path: "/anime",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: ":id",
        name: "AnimeShow",
        component: () => import("pages/AnimeDetailsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes
