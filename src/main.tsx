import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./common/styles/base.css";
import { router } from "./router/routes";
import { Toaster } from "./common/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);
