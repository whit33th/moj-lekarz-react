import { useQuery } from "@tanstack/react-query";
import { userServices } from "@services/userServices";

function useGetUserInfo() {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => userServices.getInfo(),
    select: (data) => data.data,
    staleTime: 60000,
    gcTime: 60000,
  });
  return { data, isLoading };
}

export default useGetUserInfo;
