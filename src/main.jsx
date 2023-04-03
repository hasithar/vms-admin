import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./assets/styles/app.scss";

/*
 * ----------------------------------------
 * MUI Configuration
 * ----------------------------------------
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#6A276A",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#93693E",
      contrastText: "#ffffff",
    },
    success: {
      main: "#69c464",
    },
    error: {
      main: "#e8231b",
    },
    neutral: {
      main: "#E0E0E0",
      light: "#fff",
      dark: "#9E9E9E",
    },
    default: {
      main: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
    fontSize: 14,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#fff",
          color: "#b7b7b7",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
