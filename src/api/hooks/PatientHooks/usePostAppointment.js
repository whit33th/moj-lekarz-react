import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { patientService } from "../../services/patientService";

export default function usePostAppointment() {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["postAppointment"],
    mutationFn: (data) => patientService.createVisit(data),
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Wizyta została pomyślnie umówiona!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Wystąpił błąd podczas umawiania wizyty!");
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
