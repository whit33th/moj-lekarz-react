import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import useStore from "../../../data/store";
import { clinicServices } from "../../services/clinicServices";

export default function usePostDoctor() {
  const { setModalActive } = useStore();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["postDoctor"],
    mutationFn: (data) => clinicServices.postDoctor(data),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lekarz został pomyślnie dodany!");
      queryClient.invalidateQueries(["workersList"]);
      setModalActive(false);
    }
  }, [isSuccess, queryClient, setModalActive]);

  useEffect(() => {
    if (isError) {
      toast.error("Coś poszło nie tak!");
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
