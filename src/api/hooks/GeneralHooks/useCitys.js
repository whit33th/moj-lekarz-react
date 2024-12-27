import { useQuery } from '@tanstack/react-query'
import { generalService } from '../../services/generalService'

export function useCities() {
	const { data } = useQuery({
		queryKey: ['cities'],
		queryFn: () => generalService.getCities(),
		select: (data) => data?.data || [],
		staleTime: 300 * 1000,
		gcTime: 300 * 1000
	})
	return { data }
}