import { patientService } from "../../services/patientService";
import { useQuery } from "@tanstack/react-query";

function useGetClinicsById({ clinicId, select }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["clinicsById", clinicId],
    queryFn: () => patientService.getClinicsById(clinicId),
    select: select || ((data) => data?.data || []),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return { data, isLoading, refetch };
}

export default useGetClinicsById;
