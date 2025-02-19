import { patientService } from "../../services/patientService";
import { useQuery } from "@tanstack/react-query";

function useGetPatientAppointments({
  startDate,
  endDate,
  limit,
  page,
  select,
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["patientAppointments", startDate, endDate, limit, page],
    queryFn: () =>
      patientService.getPatientVisits(startDate, endDate, limit, page),
    select: select || ((data) => data?.data || []),
    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });
  return { data, isLoading, refetch };
}

export default useGetPatientAppointments;
