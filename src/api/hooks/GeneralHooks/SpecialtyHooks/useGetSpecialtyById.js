import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../services/generalService";

function useGetSpecialtyById({ specialtyId }) {
  const { data } = useQuery({
    queryKey: ["specialtyById", specialtyId],
    queryFn: () => generalService.getSpecialtyById(specialtyId),
    select: (data) => data?.data || [],
    enabled: !!specialtyId,
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });
  return { data };
}

export default useGetSpecialtyById;
