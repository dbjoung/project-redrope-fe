import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Router from "@/app/routes.tsx";
import GlobalErrorBoundary from "./share/lib/GlobalErrorBoundary";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalErrorBoundary>
        <Router />
      </GlobalErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
