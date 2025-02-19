import { generalService } from "../../../services/generalService";
import { useQuery } from "@tanstack/react-query";

function useGetSchedules({ year, month, doctorIds }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["schedules", year, month, doctorIds],
    queryFn: () => generalService.getSchedules(year, month, doctorIds),
    select: (data) => ({
      totalHours: data?.data?.totalHours || 0,
      schedules: data?.data?.schedules || [],
    }),
    staleTime: 10 * 1000,
    gcTime: 10 * 1000,
  });

  return {
    data,
    isLoading,
    refetch,
  };
}

export default useGetSchedules;
