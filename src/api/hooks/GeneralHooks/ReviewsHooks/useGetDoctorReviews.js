import { generalService } from "../../../services/generalService";
import { useQuery } from "@tanstack/react-query";

function useGetDoctorReviews({ doctorId, limit, page, select }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["doctorReviews", doctorId, limit, page],
    queryFn: () => generalService.getDoctorReviews(doctorId, limit, page),
    select: select || ((data) => data?.data || []),

    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });
  return { data, isLoading, refetch };
}

export default useGetDoctorReviews;
