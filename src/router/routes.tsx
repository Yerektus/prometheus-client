import { LoginView } from "../features/auth/view/login/login-view";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { NavigationLayout } from "@/common/layouts/navigation-/navigation-layout";
import { AuthGuardLayout } from "@/common/layouts/auth-guard-layout/auth-guard-layout";
import { NonAuthGuardLayout } from "@/common/layouts/non-auth-guard-layout/non-auth-guard-layout";
import { NotFound } from "@/features/not-found/view/not-found-view";
import { FireSensorsView } from "@/features/fire-sensors/view/fire-sensors-view";
import { SensorReadingsView } from "@/features/sensor-readings/view/sensor-reandings-view";
import { FireSensorDetailView } from "@/features/detail-fire-sensor/view/detail-fire-sensor";
import { DetailSensorReadingView } from "@/features/detail-sensor-reading/view/detail-sensor-reading-view";

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
            path: "/dashboard/sensors/:sensorId",
            element: <FireSensorDetailView />,
          },
          {
            path: "/dashboard/sensor-readings",
            element: <SensorReadingsView />,
          },
          {
            path: "/dashboard/sensor-readings/:sensorReadingId",
            element: <DetailSensorReadingView />,
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
