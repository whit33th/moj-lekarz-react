import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export function useGetDocuments() {
  const { data, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: () => generalService.getDocuments(),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });
  return { data, isLoading };
}
