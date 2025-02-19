import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { clinicServices } from "../../services/clinicServices";

export default function usePostClinic() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["postClinic"],
    mutationFn: (data) => clinicServices.postClinic(data),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Link do konfiguracji hasła został wysłany na email!");
      queryClient.invalidateQueries(["getUserInfo"]);
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      console.log(error);
      if (error?.response?.data?.message === "Clinic already exist") {
        toast.error("Klinika o podanych danych już istnieje!");
      } else {
        toast.error("Coś poszło nie tak!");
      }
    }
  }, [isError, error]);

  return { mutate, isPending, isError, isSuccess };
}
