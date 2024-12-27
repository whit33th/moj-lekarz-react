import { useQuery } from '@tanstack/react-query'
import { searchService } from '../../services/searchService'

export default function useSearchPatient({ query, page, limit }) {
	const { data, isLoading, isError } = useQuery(
		{
			queryKey: ['searchPatient', query, page, limit],
			queryFn: () => searchService.searchPatient(query, page, limit),
			select: (data) => data?.data || [],
			enabled: !!query,
			retry: false
		}
	)
	return { data, isLoading, isError }
}

