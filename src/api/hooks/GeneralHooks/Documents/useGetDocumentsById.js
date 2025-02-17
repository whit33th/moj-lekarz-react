import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export function useGetDocumentsById(id, isModalOpen) {
  const { data, isLoading } = useQuery({
    queryKey: ["documents", id],
    queryFn: () => generalService.getDocumentsById(id),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
    enabled: !!id && isModalOpen,
  });
  return { data, isLoading };
}
