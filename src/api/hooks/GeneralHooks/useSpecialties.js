import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../services/generalService";

function useSpecialties() {
  const { data } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => generalService.getSpecialties(),
    select: (data) => data?.data || [],
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });
  return { data };
}

export default useSpecialties;
