import { LoginView } from "@/modules/auth/view/login/login-view";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/sign-in",
    element: <LoginView />,
  },
];

export const router = createBrowserRouter(routes);
