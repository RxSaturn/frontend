import { ROUTES } from "@/core/enum/routes";
import { useAuth } from "@/core/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage: React.FC = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.LOGIN);

    return () => auth.logout();
  }, []);

  return <></>;
};

export default LogoutPage;
