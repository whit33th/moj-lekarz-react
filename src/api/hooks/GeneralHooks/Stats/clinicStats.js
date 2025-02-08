import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export default function useClinicStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["clinicStats"],
    queryFn: () => generalService.getClinicStats(),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, isLoading };
}
