import { useMutation } from "@tanstack/react-query";
import { authService } from "@services/authServices";
import { toast } from "sonner";
import { useEffect } from "react";

function useResetPassword() {
  const { mutate, isError, isSuccess, error } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (data) => authService.resetPassword(data),
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

  return { mutate, isError, isSuccess, error };
}

export default useResetPassword;
