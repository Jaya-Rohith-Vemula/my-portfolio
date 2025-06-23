import { lazy } from "react";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home")),
  },
  {
    path: "/about",
    component: lazy(() => import("../pages/About")),
  },
  {
    path: "/signup",
    component: lazy(() => import("../pages/SignUp")),
  },
  {
    path: "/signin",
    component: lazy(() => import("../pages/SignIn")),
  },
  {
    path: "*",
    component: lazy(() => import("../pages/NotFound")),
  },
  {
    path: "/landingpage",
    component: lazy(() => import("../pages/LandingPage")),
  },
  {
    path: "/create",
    component: lazy(() => import("../pages/Create/Create")),
  },
];
