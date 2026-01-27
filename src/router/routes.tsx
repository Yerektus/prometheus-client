import { DashboardView } from "@/features/dashboard/view/dashboard-view";
import { LoginView } from "../features/auth/view/login/login-view";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/sign-in",
    element: <LoginView />,
  },
  {
    path: "/dashboard",
    element: <DashboardView />,
  },
];

export const router = createBrowserRouter(routes);
