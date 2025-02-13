import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { clinicServices } from "../../services/clinicServices";
import useStore from "../../../data/store";

export default function usePostDoctor() {
  const { setModalActive } = useStore();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["postDoctor"],
    mutationFn: (data) => clinicServices.postDoctor(data),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Doktor został pomyślnie dodany!");
      queryClient.invalidateQueries(["workersList"]);
      setModalActive(false);
    }
  }, [isSuccess, queryClient, setModalActive]);

  useEffect(() => {
    if (isError) {
      toast.error("Coś poszło nie tak!");
    }
  }, [isError, error]);

  return { mutate, isPending, isError, isSuccess };
}
