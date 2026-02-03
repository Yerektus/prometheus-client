import { LoginView } from "../features/auth/view/login/login-view";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { NavigationLayout } from "@/common/layouts/navigation-/navigation-layout";
import { AuthGuardLayout } from "@/common/layouts/auth-guard-layout/auth-guard-layout";
import { NonAuthGuardLayout } from "@/common/layouts/non-auth-guard-layout/non-auth-guard-layout";
import { NotFound } from "@/features/not-found/view/not-found-view";
import { FireSensorsView } from "@/features/fire-sensors/view/fire-sensors-view";
import { SensorReadingsView } from "@/features/sensor-readings/view/sensor-reandings-view";

export const routes: RouteObject[] = [
  {
    element: <NonAuthGuardLayout />,
    children: [
      {
        path: "auth/sign-in",
        element: <LoginView />,
      },
    ],
  },
  {
    element: <AuthGuardLayout />,
    children: [
      {
        element: <NavigationLayout />,
        children: [
          {
            path: "dashboard/sensors",
            element: <FireSensorsView />,
          },
          {
            path: "/dashboard/sensor-readings",
            element: <SensorReadingsView />,
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
