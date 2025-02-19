import { patientService } from "../../services/patientService";
import { useQuery } from "@tanstack/react-query";

function useAvailableSlots({
  city,
  specialty,
  date,
  visitType,
  limit,
  page,
  select,
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "searchAppointments",
      city,
      specialty,
      date,
      visitType,
      limit,
      page,
    ],
    queryFn: () =>
      patientService.availableSlots(
        city,
        specialty,
        date,
        visitType,
        limit,
        page
      ),
    select: select || ((data) => data?.data || []),
    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });
  return { data, isLoading, refetch };
}

export default useAvailableSlots;
