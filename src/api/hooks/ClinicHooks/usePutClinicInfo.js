import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";
import { toast } from "sonner";
import { clinicServices } from "../../services/clinicServices";

export default function usePutClinicInfo() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["putClinicInfo"],
    mutationFn: (data) => clinicServices.putClinicInfo(data),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Dane zaktualizowane pomyslnie!");
      queryClient.invalidateQueries(["getUserInfo"]);
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error("Cos poszło nie tak!");
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
