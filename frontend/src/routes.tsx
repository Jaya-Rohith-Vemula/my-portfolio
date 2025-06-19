import { lazy } from "react";

export const routes = [
  {
    path: "/",
    Component: lazy(() => import("./pages/Home")),
    fallback: <div>Loading Home...</div>,
  },
  {
    path: "/about",
    Component: lazy(() => import("./pages/About")),
    fallback: <div>Loading About...</div>,
  },
  {
    path: "*",
    Component: lazy(() => import("./pages/NotFound")),
    fallback: <div>Loading 404...</div>,
  },
];
