import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export function useGetDocumentsById(id) {
  // Remove isModalOpen parameter
  const { data, isLoading } = useQuery({
    queryKey: ["documents", id],
    queryFn: () => generalService.getDocumentsById(id),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
    enabled: !!id,
  });
  return { data, isLoading };
}
