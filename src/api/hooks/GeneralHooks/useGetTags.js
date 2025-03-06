import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../services/generalService";

function useGetTags() {
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => generalService.getAllTags(),
    select: (data) => {
      const tags = data?.data || [];
      return {
        positiveTags: tags.filter((tag) => tag.positive),
        negativeTags: tags.filter((tag) => !tag.positive),
      };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { tags: data, isLoading };
}

export default useGetTags;
