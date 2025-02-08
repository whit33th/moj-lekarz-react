import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

function useGetClinicSpecialties({ clinicId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["clinicSpecialties", clinicId],
    queryFn: () => generalService.getClinicSpecialties(clinicId),
    select: (data) => data?.data || [],
    enabled: !!clinicId,
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });
  return { data, isLoading };
}

export default useGetClinicSpecialties;
