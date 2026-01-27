import { paths } from "@/common/constants/paths";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthGuardLayout = () => {
  const getToken = useAuthStore((state) => state.getToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate(paths.getSignInPath(), {
        replace: true,
      });
    }
  }, []);

  return <Outlet />;
};
