import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'
import useStore from '../../data/store'


function useGetPatientsList({ page, limit }) {
	const { userId } = useStore()
	const { data, isLoading, isError } = useQuery({
		queryKey: ["useGetPatientsList", userId, page, limit],
		queryFn: () => doctorServices.getPatientsList(userId, page, limit),
		select: (data) => {
			return data?.data.patients || []
		},
		enabled: !!userId,
		staleTime: 30 * 1000,
		gcTime: 30 * 1000
	})

	console.log(data, "useGetPatientsList")
	return { data, isLoading, isError }
}

export default useGetPatientsList
