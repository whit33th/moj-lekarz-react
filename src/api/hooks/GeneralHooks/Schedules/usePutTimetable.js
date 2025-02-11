import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";
import { toast } from "sonner";
import { generalService } from "../../../services/generalService";
import useStore from "../../../../data/store";

export default function usePutTimetable() {
  const { setModalActive } = useStore();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["putTimetable"],
    mutationFn: (data) => generalService.putTimetable(data),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Dane zaktualizowane pomyslnie!");
      queryClient.invalidateQueries(["getUserInfo"]);
      setModalActive(false);
    }
  }, [isSuccess, queryClient, setModalActive]);

  useEffect(() => {
    if (isError) {
      toast.error("Cos poszło nie tak!");
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
