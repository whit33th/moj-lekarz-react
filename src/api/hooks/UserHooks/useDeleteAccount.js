import { useMutation } from "@tanstack/react-query";
import { userServices } from "@services/userServices";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import clearAllCookies from "./../../../utils/deleteAllCookies";
import useLogout from "./../AuthHooks/useLogout";

export default function useDeleteAccount() {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: () => userServices.deleteAccount(),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Konto usunięte!");
      logout();
      window.location.reload();
      clearAllCookies();
      navigate("/");
    }
  }, [isSuccess, logout, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error("Cos poszło nie tak!");
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
