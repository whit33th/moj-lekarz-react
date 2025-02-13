import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export function useGetCategory() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => generalService.getCategories(),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });
  return { data, isLoading };
}
