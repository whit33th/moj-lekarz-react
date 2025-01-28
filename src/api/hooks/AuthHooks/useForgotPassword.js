import { useMutation } from "@tanstack/react-query";
import { authService } from "@services/authServices";
import { toast } from "sonner";
import { useEffect } from "react";

function useForgotPassword() {
  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: (data) => authService.forgotPassword(data),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Haslo wyslane na email");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Wystapil blad");
    }
  }, [isError]);

  return { mutate, isLoading, isError, isSuccess, error };
}

export default useForgotPassword;
