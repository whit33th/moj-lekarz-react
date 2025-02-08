import { useQuery } from '@tanstack/react-query'
import { searchService } from '../../services/searchService'

export default function useSearchDoctor({ query, page, limit }) {
	const { data, isLoading, isError } = useQuery(
		{
			queryKey: ['searchDoctor', query, page, limit],
			queryFn: () => searchService.searchDoctor(query, page, limit),
			select: (data) => data?.data || [],
			enabled: !!query ,
			retry: false
		}
	)
	return { data, isLoading, isError }
}

