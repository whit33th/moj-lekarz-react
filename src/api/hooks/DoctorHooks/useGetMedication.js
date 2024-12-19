import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'

function useGetMedication() {


	const { data, isSuccess } = useQuery({
		queryKey: ["useGetMedication"],
		queryFn: () => doctorServices.getMedication(),
		select: (data) => data?.data || [],
		staleTime: 120000,
		gcTime: 120000
	})

	return { data, isSuccess }
}

export default useGetMedication
