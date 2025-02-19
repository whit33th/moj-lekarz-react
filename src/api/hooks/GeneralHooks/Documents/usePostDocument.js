import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";
import { useEffect } from "react";
import { toast } from "sonner";

export function usePostDocument() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["postDocument"],
    mutationFn: ({ id, file }) => generalService.postDocument(id, file),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["documents"]);
      toast.success("Dokument został pomyślnie wysłany!");
    }
    if (isError) {
      toast.error("Wystąpił błąd podczas wysyłania dokumentu!");
    }
    if (isPending) {
      toast.loading("Wysyłanie dokumentu...");
    }
    toast.dismiss();
  }, [isPending, isError, isSuccess, queryClient]);

  return { mutate, isPending, isError, isSuccess };
}
