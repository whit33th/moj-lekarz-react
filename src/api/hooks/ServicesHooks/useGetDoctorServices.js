import { useQuery } from "@tanstack/react-query";
import { servicesService } from "./../../services/servicesServices";

export default function useGetDoctorServices(doctorId) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctorServices", doctorId],
    queryFn: () => servicesService.getDoctorServices(doctorId),
    select: (data) => data?.data || [],
    enabled: !!doctorId,
    staleTime: 10 * 1000,
    retry: false,
  });
  return { data, isLoading, isError };
}
