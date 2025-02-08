import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { generalService } from "../../../services/generalService";

export default function useDeletePosts() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["deletePosts"],
    mutationFn: (id) => generalService.deletePosts(id),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Blog usuniety!");
      queryClient.invalidateQueries(["posts"]);
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error("Cos poszło nie tak!");
    }
  }, [isError]);

  return { mutate, isPending, isError, isSuccess };
}
