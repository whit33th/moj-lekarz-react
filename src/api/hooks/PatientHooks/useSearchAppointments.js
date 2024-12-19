
import { patientService } from '../../services/patientService'
import { useQuery } from '@tanstack/react-query'

function useSearchAppointments({ city, specialty, date, visitType, limit, page, select }) {

	const { data, isLoading } = useQuery({
		queryKey: ['searchAppointments', city, specialty, date, visitType, limit, page],
		queryFn: () => patientService.searchAppointments(city, specialty, date, visitType, limit, page),
		select: select || ((data) => data?.data || []),
		// enabled: !!city || !!specialty || !!date,
		staleTime: 10 * 1000,
		gcTime: 10 * 1000
	})
	return { data, isLoading }
}

export default useSearchAppointments