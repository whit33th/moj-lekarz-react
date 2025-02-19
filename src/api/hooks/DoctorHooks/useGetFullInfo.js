import { useQuery } from "@tanstack/react-query";
import { doctorServices } from "../../services/doctorServices";

function useGetFullInfo(id) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getFullInfo", id],
    queryFn: () => doctorServices.getFullInfo(id),
    select: (data) => data.data,
    enabled: !!id,
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });

  return { data, isSuccess, isLoading };
}

export default useGetFullInfo;
