import { generalService } from "../../../services/generalService";
import { useQuery } from "@tanstack/react-query";

function useGetAdminModerateReviews({ select } = {}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["adminReviewsModerate"],
    queryFn: () => generalService.getAdminModerateReviews(),
    select: select || ((data) => data.data || []),
    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });
  return { data, isLoading, refetch };
}

export default useGetAdminModerateReviews;
