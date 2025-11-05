"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import Bootstrapper from "../components/Bootstrapper";
import "./../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Track dark mode preference safely on client
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const darkPref = localStorage.getItem("ddtm_dark") === "1";
    setDarkMode(darkPref);
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
          background: {
            default: darkMode ? "#121212" : "#f5f7fa",
            paper: darkMode ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#1a1a1a",
            secondary: darkMode ? "#bdbdbd" : "#555555",
          },
        },
        typography: {
          fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
          h6: { fontWeight: 600 },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiTableCell: {
            styleOverrides: {
              root: { whiteSpace: "nowrap" },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              },
            },
          },
        },
      } as ThemeOptions),
    [darkMode]
  );

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Bootstrapper />
            <main style={{ padding: "1.5rem" }}>{children}</main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
