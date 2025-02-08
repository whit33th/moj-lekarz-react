import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export default function useDoctorStats() {
  const { data,isLoading } = useQuery({
    queryKey: ["doctorStats"],
    queryFn: () => generalService.getDoctorStats(),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, isLoading };
}
