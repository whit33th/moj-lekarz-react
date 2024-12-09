import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'
import useStore from '../../data/store'


function useGetPatientsList({ offset, limit }) {
  const {  userId} = useStore()
	const { data, isLoading, isError } = useQuery({
		queryKey: ["useGetPatientsList", userId, offset, limit],
		queryFn: () => doctorServices.getPatientsList(userId, offset, limit),
		select: (data) => data.data,
		enabled: !!userId,
		staleTime: 30 * 1000,
		gcTime: 30 * 1000
	})

	return { data, isLoading, isError }
}

export default useGetPatientsList
