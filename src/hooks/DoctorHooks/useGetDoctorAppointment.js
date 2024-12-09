import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'
import useStore from '../../data/store'

function useGetDoctorAppointment({ dateFrom, dateTo, limit, offset, status }) {

	const { userId } = useStore()


	const { data, isSuccess, isLoading } = useQuery({
		queryKey: ["getAppointment", userId, dateFrom, dateTo, limit, offset, status],
		queryFn: () => doctorServices.getAppointment(userId, dateFrom, dateTo, limit, offset, status),
		select: (data) => {
			return data.data
		},
		enabled: !!userId,
		staleTime: 30 * 1000,
		gcTime: 30 * 1000
	})

	return { data, isSuccess, isLoading }
}

export default useGetDoctorAppointment
