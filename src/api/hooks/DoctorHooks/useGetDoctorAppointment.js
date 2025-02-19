import { useQuery } from "@tanstack/react-query";
import { doctorServices } from "../../services/doctorServices";

function useGetDoctorAppointment({ dateFrom, dateTo, limit, page, status }) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAppointment", dateFrom, dateTo, limit, page, status],
    queryFn: () =>
      doctorServices.getAppointment(dateFrom, dateTo, limit, page, status),
    select: (data) => {
      return data?.data || [];
    },
    staleTime: 30 * 1000,
    gcTime: 30 * 1000,
  });

  return { data, isSuccess, isLoading };
}

export default useGetDoctorAppointment;
