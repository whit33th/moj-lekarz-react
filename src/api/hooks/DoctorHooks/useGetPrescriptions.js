import { useQuery } from "@tanstack/react-query";
import { doctorServices } from "../../services/doctorServices";

function useGetPrescriptions({ limit, page, sort }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["useGetPrescriptions", limit, page, sort],
    queryFn: () => doctorServices.getPrescriptions(limit, page, sort),
    select: (data) => data?.data || [],

    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });

  return { data, isLoading, isError };
}

export default useGetPrescriptions;
