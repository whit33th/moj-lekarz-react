import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userServices } from "@services/userServices";
import { useEffect } from "react";
import { toast } from "sonner";

export default function usePutUserInfo() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["putUserInfo"],
    mutationFn: (data) => userServices.putInfo(data),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Dane zaktualizowane pomyslnie!");
      queryClient.invalidateQueries(["getUserInfo"]);
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error("Cos poszło nie tak!");
      console.log("Error:", error);
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
