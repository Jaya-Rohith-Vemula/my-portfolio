import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "gray",
          },
        },
      },
    },
  },
});

export default theme;
