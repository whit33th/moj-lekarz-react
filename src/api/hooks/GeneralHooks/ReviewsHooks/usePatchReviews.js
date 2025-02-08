import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { generalService } from "../../../services/generalService";
import useStore from "../../../../data/store";

function useDeleteReviews() {
  const queryClient = useQueryClient();
  const { setModalActive } = useStore();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: (id) => generalService.acceptReview(id),
    mutationKey: "patchAdminReview",
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Opinia została zaakceptowana");
      queryClient.invalidateQueries("adminReviews");
      setModalActive(false);
    }
  }, [isSuccess, queryClient, setModalActive]);

  useEffect(() => {
    if (isError) {
      toast.error("Nie udało się zaakceptowac opinii");
    }
  }, [isError]);

  return { mutate, isSuccess, isError };
}

export default useDeleteReviews;
