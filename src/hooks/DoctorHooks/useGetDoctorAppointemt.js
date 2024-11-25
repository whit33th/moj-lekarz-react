import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'

function useGetDoctorAppointment(id) {

	const { data } = useQuery({
		queryKey: ["getAppointment", id],
		queryFn: () => doctorServices.getAppointment(id),
		select: (data) => data.data,
		enabled: !!id
	})

	return { data }
}

export default useGetDoctorAppointment
