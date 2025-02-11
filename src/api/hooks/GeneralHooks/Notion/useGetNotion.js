import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export function useGetNotion() {
  const { data, isLoading } = useQuery({
    queryKey: ["notions"],
    queryFn: () => generalService.getNotion(),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });
  return { data, isLoading };
}
