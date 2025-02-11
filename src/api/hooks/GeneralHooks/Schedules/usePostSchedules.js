import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";
import { toast } from "sonner";
import { clinicServices } from "../../../services/clinicServices";

export default function usePostSchedules() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["postSchedule"],
    mutationFn: (data) => clinicServices.postSchedule(data),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Dane zaktualizowane pomyslnie!");
      queryClient.invalidateQueries(["getSchedules"]);
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error("Cos poszło nie tak!");
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
