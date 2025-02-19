import useStore from "@data/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { doctorServices } from "../../services/doctorServices";

function usePostMedications() {
  const { setModalActive } = useStore();
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isPending, isError } = useMutation({
    mutationKey: ["usePostMedications"],
    mutationFn: (data) => doctorServices.postMedications(data),
  });
  useEffect(() => {
    if (isError) {
      toast.error("Cos poszło nie tak!");
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Lek dodany pomyslnie!");
      queryClient.invalidateQueries(["useGetMedications"]);
    }
  }, [isSuccess, setModalActive, queryClient]);

  useEffect(() => {
    if (isPending) {
      toast.loading("Dodawanie leku...");
    }
    toast.dismiss();
  }, [isPending]);

  return { mutate, isSuccess, isPending };
}

export default usePostMedications;
