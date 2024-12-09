import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'

function useGetPrescriptions({ id }) {

	const { data, isLoading, isError } = useQuery({
		queryKey: ["useGetPrescriptions", id],
		queryFn: () => doctorServices.getPrescriptions(id),
		select: (data) => data.data,
		enabled: !!id,
		staleTime: 60 * 1000,
		gcTime: 60 * 1000
	})

	return { data, isLoading, isError }
}

export default useGetPrescriptions
