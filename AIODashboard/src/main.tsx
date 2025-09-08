import { Suspense, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext/AuthContext.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min  - just fallback default
      gcTime: 1000 * 60 * 60, //  sessionStorage will clear after 1 hour of inactivity
    },
  },
});

const sessionStoragePersister = createAsyncStoragePersister({
  storage: window.sessionStorage, // or window.localStorage
});

// Hook up persistence
persistQueryClient({
  queryClient,
  persister: sessionStoragePersister,
  maxAge: 1000 * 60 * 60, // 1 hour cache survival
});

const theme = createTheme({
  colorSchemes: {
    dark: false,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Suspense fallback={<>Loading... Please wait</>}>
              <App />
            </Suspense>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
