import { LoginView } from "../features/auth/view/login/login-view";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { NavigationLayout } from "@/common/layouts/navigation-/navigation-layout";
import { AuthGuardLayout } from "@/common/layouts/auth-guard-layout/auth-guard-layout";
import { NonAuthGuardLayout } from "@/common/layouts/non-auth-guard-layout/non-auth-guard-layout";
import { NotFound } from "@/features/not-found/view/not-found-view";
import { FireSensorsView } from "@/features/fire-sensors/view/fire-sensors-view";

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
            element: <FireSensorsView />,
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
