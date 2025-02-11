import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export default function useAdminStatsDetails({ startDate, endDate } = {}) {
  const { data } = useQuery({
    queryKey: ["adminStatsDetails", startDate, endDate],
    queryFn: () => generalService.getAdminStatsDetails(startDate, endDate),
    select: (data) => data?.data,
    staleTime: 180 * 1000,
    gcTime: 180 * 1000,
    suspense: true,
  });

  return data;
}
