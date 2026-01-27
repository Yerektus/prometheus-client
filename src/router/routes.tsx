import { DashboardView } from "@/features/dashboard/view/dashboard-view";
import { LoginView } from "../features/auth/view/login/login-view";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { NavigationLayout } from "@/common/layouts/navigation-/navigation-layout";
import { AuthGuardLayout } from "@/common/layouts/auth-guard-layout/auth-guard-layout";

export const routes: RouteObject[] = [
  {
    path: "/sign-in",
    element: <LoginView />,
  },
  {
    path: "/",
    element: <AuthGuardLayout />,
    children: [
      {
        path: "/",
        element: <NavigationLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardView />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
