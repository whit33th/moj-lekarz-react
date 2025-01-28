import { patientService } from "../../services/patientService";
import { useQuery } from "@tanstack/react-query";

function useGetClinics({
  name,
  province,
  specialty,
  city,
  limit,
  page,
  select,
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["clinics", name, province, specialty, city, limit, page],
    queryFn: () =>
      patientService.getClinics(name, province, specialty, city, limit, page),
    select: select || ((data) => data?.data || []),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return { data, isLoading, refetch };
}

export default useGetClinics;
