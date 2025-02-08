import { generalService } from "../../../services/generalService";
import { useQuery } from "@tanstack/react-query";

function useGetAdminReviews({ status, limit, page, select }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["adminReviews", status, limit, page],
    queryFn: () => generalService.getAdminReviews(status, limit, page),
    select: select || ((data) => data.data || []),
    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });
  return { data, isLoading, refetch };
}

export default useGetAdminReviews;
