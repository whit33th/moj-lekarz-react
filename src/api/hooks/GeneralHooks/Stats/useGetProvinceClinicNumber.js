import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export function useGetClinicStats() {
  const { data } = useQuery({
    queryKey: ["clinicStats"],
    queryFn: () => generalService.getClinicStats(),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });

  const totalCount =
    data?.reduce((acc, i) => acc + Number(i.clinicCount || 0), 0) || 0;

  return { data, totalCount };
}
