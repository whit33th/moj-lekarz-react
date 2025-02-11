import useStore from "@data/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { clinicServices } from "../../services/clinicServices";

function usePutDoctorInfo() {
  const { setModalActive } = useStore();
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError, error } = useMutation({
    mutationKey: ["putDoctorInfo"],
    mutationFn: (data) => clinicServices.putDoctorInfo(data.doctorId, data),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Coś poszło nie tak!");
      console.log(error)
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Informacje zostały zaktualizowane!");
      queryClient.invalidateQueries(["getFullInfo"]);
      setModalActive(false);
    }
  }, [isSuccess, setModalActive, queryClient]);

  return { mutate, isSuccess };
}

export default usePutDoctorInfo;
