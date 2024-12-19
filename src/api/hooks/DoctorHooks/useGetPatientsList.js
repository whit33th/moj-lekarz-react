import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'

function useGetPatientsList({ page, limit, select }) {

	const { data, isLoading, isError } = useQuery({
		queryKey: ["useGetPatientsList", page, limit],
		queryFn: () => doctorServices.getPatientsList( page, limit),
		select: select || ((data) => data?.data.patients || []),
		staleTime: 30 * 1000,
		gcTime: 30 * 1000
	})

	console.log(data, "useGetPatientsList")
	return { data, isLoading, isError }
}

export default useGetPatientsList
