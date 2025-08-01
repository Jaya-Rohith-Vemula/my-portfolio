import { Box } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import ErrorFallback from "../components/ErrorFallback";
import Header from "../components/Header";

const Root = () => {
  const { pathname } = useLocation();

  const hideHeaderOn = ["/", "/signin", "/signup", "/edit"];

  const shouldHideHeader = () =>
    hideHeaderOn.includes(pathname) ||
    matchPath({ path: "/portfolio/:publicId", end: true }, pathname);

  return (
    <>
      {!shouldHideHeader() && <Header />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Box>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Box>
    </>
  );
};

export default Root;
