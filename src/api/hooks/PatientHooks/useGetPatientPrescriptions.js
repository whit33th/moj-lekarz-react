import { patientService } from "../../services/patientService";
import { useQuery } from "@tanstack/react-query";

function useGetPatientPrescriptions({ status, limit, page, select }) {
  const { data, isLoading } = useQuery({
    queryKey: ["patientPrescriptions", status, limit, page],
    queryFn: () => patientService.getPatientPrescriptions(status, limit, page),
    select: select || ((data) => data?.data || []),
    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });
  return { data, isLoading };
}

export default useGetPatientPrescriptions;
