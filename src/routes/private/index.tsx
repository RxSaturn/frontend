import { useLocation, Navigate, Outlet } from "react-router-dom";
import { usePermission } from "@/core/hooks/use-permission";
import { ROUTES } from "@/core/enum/routes";
import { useAuthStore } from "@/core/stores/auth";

interface AuthProps {
  permissionName: string;
}

const Auth: React.FC<AuthProps> = ({ permissionName }) => {
  const location = useLocation();
  const { permission } = usePermission();
  const { authData } = useAuthStore((state) => state);

  const hasPermission = permission.canAccess(permissionName);

  return authData?.token ? (
    !hasPermission ? (
      <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: location }} replace />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

export default Auth;
