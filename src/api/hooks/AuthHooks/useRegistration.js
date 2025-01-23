import { useMutation } from "@tanstack/react-query";

import { authService } from '@services/authServices';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import useStore  from "@data/store";

function useRegistration() {
  const navigate = useNavigate();
  const {setIsAuth} = useStore();
  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationKey: ["registrationUser"],
    mutationFn: (data) => authService.registration(data),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Rejestracja powiodła się");
      setIsAuth(true);
      navigate("/");
    }
  }
  , [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error("Registracjia nie powiodła się");
    }
  }
  , [isError, navigate]);

 
  return { mutate, isLoading, isError, isSuccess, error };
}

export default useRegistration;
