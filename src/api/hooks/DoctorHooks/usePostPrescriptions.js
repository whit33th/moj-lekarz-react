import useStore from "@data/store";
import { doctorServices } from "../../services/doctorServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

function usePostPrescriptions() {
  const { setModalActive } = useStore();
  const queryClient = useQueryClient();
  
  const { mutate, isSuccess, isError } = useMutation({
    mutationKey: ["postPrescriptions"],
    mutationFn: (data) => doctorServices.postPrescriptions(data),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Cos poszło nie tak!");
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Recepta dodana pomyslnie!");
      queryClient.invalidateQueries(["useGetPrescriptions"]);
      setModalActive(false);
    }
  }, [isSuccess, setModalActive, queryClient]);

  return { mutate, isSuccess };
}

export default usePostPrescriptions;
