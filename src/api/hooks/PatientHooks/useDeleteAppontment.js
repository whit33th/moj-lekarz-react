import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";
import { toast } from "sonner";
import { patientService } from "../../services/patientService";

function useDeleteAppointment(id) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: () => patientService.deleteVisit(id),
    mutationKey: "deletePatientVisit",
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Wizyta została usunięta");
      queryClient.invalidateQueries("patientAppointments");
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error("Nie udało się usunąć wizyty");
    }
  }, [isError]);

  return { mutate, isSuccess, isError };
}

export default useDeleteAppointment;
