import { useQuery } from "@tanstack/react-query";
import { searchService } from "../../services/searchService";

export default function useSearchPost({ query, page, limit }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchPost", query, page, limit],
    queryFn: () => searchService.searchPost(query, page, limit),
    select: (data) => data?.data || [],
    enabled: !!query,
    retry: false,
  });
  return { data, isLoading, isError };
}
