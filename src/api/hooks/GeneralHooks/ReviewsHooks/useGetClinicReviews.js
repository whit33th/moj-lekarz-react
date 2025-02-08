import { generalService } from "../../../services/generalService";
import { useQuery } from "@tanstack/react-query";

function useGetClinicReviews({
  clinicId,
  sortDate,
  sortRating,
  page,
  limit,
  select,
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["clinicReviews", status],
    queryFn: () =>
      generalService.getClinicReviews(
        clinicId,
        sortDate,
        sortRating,
        page,
        limit
      ),
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

export default useGetClinicReviews;
