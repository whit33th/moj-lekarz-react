import { useQuery } from "@tanstack/react-query";
import { doctorServices } from "../../services/doctorServices";
function useGetShortInfo(id) {
  const { data, isSuccess } = useQuery({
    queryKey: ["getShortInfo", id],
    queryFn: () => doctorServices.getShortInfo(id),
    select: (data) => data.data,
    enabled: !!id,
    staleTime: 60000,
    gcTime: 60000,
  });

  console.log(data, "useGetShortInfo");

  return { data, isSuccess };
}

export default useGetShortInfo;
