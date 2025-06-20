import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import ErrorFallback from "../components/ErrorFallback";
import Root from "./Root";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} errorElement={<ErrorFallback />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
