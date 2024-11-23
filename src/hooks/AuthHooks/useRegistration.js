import { useMutation } from "@tanstack/react-query";

import { authService } from "../../services/AuthServices";

function useRegistration() {
  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationKey: ["registrationUser"],
    mutationFn: (data) => authService.registration(data),

    onSuccess: (res) => {
      console.log("Успех:", res.data);
    },
    onError: (error) => {
      console.error("Ошибка:", error);
    },
  });
  return { mutate, isLoading, isError, isSuccess, error };
}

export default useRegistration;
