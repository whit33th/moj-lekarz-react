import { useQuery } from "@tanstack/react-query"
import { patientService } from '../../services/patientService'

function useGetPatientInfo(patientId) {


	const { data, isSuccess, isLoading, isError  } = useQuery({
		queryKey: ["getPatientInfo", patientId],
		queryFn: () => patientService.getPatientInfo(patientId),
		select: (data) => data.data,
		enabled: !!patientId,
		retry: false
	})


	return { data, isSuccess, isLoading, isError }
}

export default useGetPatientInfo
