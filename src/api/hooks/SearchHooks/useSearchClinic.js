import { useQuery } from "@tanstack/react-query";
import { searchService } from "../../services/searchService";

export default function useSearchClinic({ query, page, limit }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchClinic", query, page, limit],
    queryFn: () => searchService.searchClinic(query, page, limit),
    select: (data) => data?.data || [],
    enabled: !!query,
    retry: false,
  });
  return { data, isLoading, isError };
}
