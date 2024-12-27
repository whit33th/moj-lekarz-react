import { useQuery } from '@tanstack/react-query'
import { searchService } from '../../services/searchService'

export default function useSearchPrescription({ query, page, limit }) {
	const { data, isLoading, isError } = useQuery(
		{
			queryKey: ['searchPrescription', query, page, limit],
			queryFn: () => searchService.searchPrescription(query, page, limit),
			select: (data) => data?.data || [],
			enabled: !!query,
			retry: false
		}
	)
	return { data, isLoading, isError }
}

