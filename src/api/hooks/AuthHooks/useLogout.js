import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { authService } from "@services/authServices";
import { useNavigate } from "react-router-dom";
import clearAllCookies from "@utils/deleteAllCookies";

function useLogout() {
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["logout"],
    queryFn: () => authService.logout(),
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
      clearAllCookies();

      navigate("/");
    }
  }, [isSuccess, navigate]);

  return { data, logout: refetch, isLoading };
}

export default useLogout;
