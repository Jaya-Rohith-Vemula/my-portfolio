import { Box } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";
import ErrorFallback from "../components/ErrorFallback";
import Header from "../components/Header";

const Root = () => {
  const { pathname } = useLocation();

  const hideHeaderOn = ["/", "/signin", "/signup", "/edit"];

  const shouldHideHeader = () => hideHeaderOn.includes(pathname);

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
        <Box component="main" id="main">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Box>
    </>
  );
};

export default Root;
