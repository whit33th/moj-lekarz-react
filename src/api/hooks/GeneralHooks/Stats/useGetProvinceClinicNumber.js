import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export function useGetClinicProvinceStats() {
  const { data } = useQuery({
    queryKey: ["clinicProvinceStats"],
    queryFn: () => generalService.getClinicProvinceStats(),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });

  const totalCount =
    data?.reduce((acc, i) => acc + Number(i.clinicCount || 0), 0) || 0;

  return { data, totalCount };
}
