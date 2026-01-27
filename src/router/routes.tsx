import { DashboardView } from "@/features/dashboard/view/dashboard-view";
import { LoginView } from "../features/auth/view/login/login-view";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { NavigationLayout } from "@/common/layouts/navigation-/navigation-layout";
import { AuthGuardLayout } from "@/common/layouts/auth-guard-layout/auth-guard-layout";
import { NonAuthGuardLayout } from "@/common/layouts/non-auth-guard-layout/non-auth-guard-layout";
import { NotFound } from "@/features/not-found/view/not-found-view";

export const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <NonAuthGuardLayout />,
    children: [
      {
        path: "sign-in",
        element: <LoginView />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthGuardLayout />,
    children: [
      {
        path: "dashboard",
        element: <NavigationLayout />,
        children: [
          {
            path: "sensors",
            element: <DashboardView />,
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
