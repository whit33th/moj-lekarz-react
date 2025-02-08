import { clinicServices } from "../../services/clinicServices";
import { useQuery } from "@tanstack/react-query";

function useGetWorkersList({
  clinicId,
  gender,
  sort = "asc",
  ratingSort,
  limit = 10,
  page = 1,
  select,
}) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["workersList", clinicId, gender, sort, ratingSort, limit, page],
    queryFn: () =>
      clinicServices.getWorkersByClinicId(clinicId, {
        gender,
        sort,
        ratingSort,
        limit,
        page,
      }),
    select: select || ((data) => data?.data || []),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    data,
    isLoading,
    error,
    refetch
  };
}

export default useGetWorkersList;
