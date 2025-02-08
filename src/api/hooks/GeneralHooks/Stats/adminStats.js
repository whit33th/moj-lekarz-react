import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export default function useAdminStats() {
  const { data } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => generalService.getAdminStats(),
    select: (data) => data?.data,
    staleTime: 180 * 1000,
    gcTime: 180 * 1000,
    suspense: true,
  });

  return data;
}
