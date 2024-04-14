import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "./theme/Theme";
import { SnackbarProvider } from "notistack";
import { AppContextProvider } from "./context/AppContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 6000,
      refetchOnWindowFocus: false,
    },
  },
});
const theme = getTheme();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContextProvider>
              <App />
            </AppContextProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
