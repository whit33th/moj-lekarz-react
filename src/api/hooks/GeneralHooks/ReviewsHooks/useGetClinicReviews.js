import { generalService } from "../../../services/generalService";
import { useQuery } from "@tanstack/react-query";

function useGetClinicReviews({
  clinicId,
  sortDate, // ASC or DESC
  sortRating, // ASC or DESC
  limit,
  page,
  select,
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["clinicReviews", clinicId, sortDate, sortRating, limit, page],
    queryFn: () =>
      generalService.getClinicReviews(
        clinicId,
        sortDate,
        sortRating,
        limit,
        page
      ),
    select: select || ((data) => data?.data || []),
    enabled: !!clinicId,
    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });
  return { data, isLoading, refetch };
}

export default useGetClinicReviews;
