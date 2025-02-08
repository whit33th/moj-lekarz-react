import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { generalService } from "../../../services/generalService";
import useStore from "../../../../data/store";

function useDeleteReviews() {
  const queryClient = useQueryClient();
  const { setModalActive } = useStore();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: (id) => generalService.deleteReview(id),
    mutationKey: "deleteAdminReview",
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Opinia została usunięta");
      queryClient.invalidateQueries("adminReviews");
      setModalActive(false);
    }
  }, [isSuccess, queryClient, setModalActive]);

  useEffect(() => {
    if (isError) {
      toast.error("Nie udało się usunąć opinii");
    }
  }, [isError]);

  return { mutate, isSuccess, isError };
}

export default useDeleteReviews;
