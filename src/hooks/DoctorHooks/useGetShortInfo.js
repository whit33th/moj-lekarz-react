import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'

function useGetShortInfo(id) {

	const { data } = useQuery({
		queryKey: ["getShortInfo", id],
		queryFn: () => doctorServices.getShortInfo(id),
		select: (data) => data.data,
		refetchOnWindowFocus: false,
		enabled: !!id
	})

	return { data }
}

export default useGetShortInfo
