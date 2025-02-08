import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";
import { toast } from "sonner";
import { generalService } from "../../../services/generalService";

export default function usePutSchedules() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["putSchedule"],
    mutationFn: (data) => generalService.putSchedules(data),
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
