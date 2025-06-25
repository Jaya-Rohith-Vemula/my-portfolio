import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, protectedRoutes } from "./routes";
import Root from "./Root";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorFallback from "../components/ErrorFallback";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} errorElement={<ErrorFallback />}>
          {publicRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          <Route element={<ProtectedRoute />}>
            {protectedRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
