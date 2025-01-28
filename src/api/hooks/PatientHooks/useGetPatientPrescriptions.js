import { patientService } from "../../services/patientService";
import { useQuery } from "@tanstack/react-query";

function useGetPatientPrescriptions() {
  const { data, isLoading } = useQuery({
    queryKey: ["patientPrescriptions"],
    queryFn: () => patientService.getPatientPrescriptions(),
    select: (data) => data?.data || [],
    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });
  return { data, isLoading };
}

export default useGetPatientPrescriptions;
