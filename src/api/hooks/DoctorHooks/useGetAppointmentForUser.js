import { useQuery } from "@tanstack/react-query";
import { doctorServices } from "../../services/doctorServices";

function useGetAppointmentForUser({ patientId, limit, page }) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAppointmentForUser", patientId, limit, page],
    queryFn: () => doctorServices.getAppointmentForUser(patientId, limit, page),
    select: (data) => {
      return data?.data || [];
    },
    staleTime: 30 * 1000,
    gcTime: 30 * 1000,
  });

  return { data, isSuccess, isLoading };
}

export default useGetAppointmentForUser;
