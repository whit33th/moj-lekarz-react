import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { clinicServices } from "../../services/clinicServices";
import useStore from "../../../data/store";
import { pageConfig } from "../../../config/config";
import { useNavigate } from "react-router-dom";

export default function useDeleteDoctor() {
  const navigate = useNavigate();
  const { setModalActive } = useStore();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["deleteDoctor"],
    mutationFn: (id) => clinicServices.deleteDoctor(id),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(pageConfig.firm.workers);
      toast.success("Lekarz został pomyślnie usunięty!");
      queryClient.invalidateQueries(["workersList"]);
    }
  }, [isSuccess, queryClient, setModalActive, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error("Nie udało się usunąć lekarza!");
    }
  }, [isError, error]);

  return { mutate, isPending, isError, isSuccess };
}
