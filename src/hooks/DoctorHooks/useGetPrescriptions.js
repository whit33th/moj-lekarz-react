import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'

function useGetPrescriptions({ id, limit, page, sort }) {

	const { data, isLoading, isError } = useQuery({
		queryKey: ["useGetPrescriptions", id, limit, page, sort],
		queryFn: () => doctorServices.getPrescriptions(id, limit, page, sort),
		select: (data) => data?.data || [],
		enabled: !!id,
		staleTime: 60 * 1000,
		gcTime: 60 * 1000
	})

	return { data, isLoading, isError }
}

export default useGetPrescriptions
