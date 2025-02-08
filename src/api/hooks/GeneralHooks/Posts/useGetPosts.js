import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export function useGetPosts(page, limit) {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => generalService.getPosts(page, limit),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });
  return { data, isLoading };
}
