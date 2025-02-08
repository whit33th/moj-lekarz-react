import { generalService } from "../../../services/generalService";
import { useQuery } from "@tanstack/react-query";

function useGetAdminReviews({ status, select }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["adminReviews", status],
    queryFn: () => generalService.getAdminReviews(status),
    select: select || ((data) => data?.data || []),
    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });
  return {
    data,
    isLoading,

    refetch,
  };
}

export default useGetAdminReviews;
