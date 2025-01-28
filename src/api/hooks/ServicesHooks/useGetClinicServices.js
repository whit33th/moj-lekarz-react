import { useQuery } from "@tanstack/react-query";
import { servicesService } from "../../services/servicesServices";

export default function useGetClinicServices({clinicId}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["clinicServices", clinicId],
    queryFn: () => servicesService.getClinicServices(clinicId),
    select: (data) => data?.data || [],
    enabled: !!clinicId,
    staleTime: 10 * 1000,
    retry: false,
  });
  return { data, isLoading, isError };
}
