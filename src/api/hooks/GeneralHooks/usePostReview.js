import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { generalService } from "../../services/generalService";

export default function usePostReview() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["postReview"],
    mutationFn: (data) => generalService.postReview(data),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Opinia została dodana!");
      queryClient.invalidateQueries(["reviews"]);
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error("Nie udało się dodać opinii!");
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
