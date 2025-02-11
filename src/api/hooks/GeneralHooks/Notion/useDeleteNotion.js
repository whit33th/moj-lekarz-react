import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { generalService } from "../../../services/generalService";

export default function useDeleteNotion() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["deleteNotion"],
    mutationFn: (id) => generalService.deleteNotion(id),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Notatka usunieta!");
      queryClient.invalidateQueries(["notions"]);
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error("Cos poszło nie tak!");
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
