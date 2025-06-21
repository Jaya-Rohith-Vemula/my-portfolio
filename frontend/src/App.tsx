import "./App.css";

import Router from "./layout/Router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
