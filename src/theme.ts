"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9c27b0",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto), Arial, sans-serif",
    button: {
      fontWeight: 500,
      letterSpacing: "0.4px",
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
