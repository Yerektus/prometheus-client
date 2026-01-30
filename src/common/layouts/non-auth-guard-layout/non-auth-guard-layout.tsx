import { paths } from "@/common/constants/paths";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const NonAuthGuardLayout = () => {
  const getToken = useAuthStore((state) => state.getToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate(paths.getSensorsPath(), {
        replace: true,
      });
    }
  }, []);

  return <Outlet />;
};
