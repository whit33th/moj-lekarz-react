import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { authService } from '../../services/authServices'
import { useNavigate } from 'react-router-dom'
import clearAllCookies from '../../utils/deleteAllCookies'

function useLogout() {

	const navigate = useNavigate()
	const { data, isSuccess, isError, isLoading, refetch } = useQuery({
		queryKey: ['logout'],
		queryFn: async () => {
			const response = await authService.logout()
			console.log(response.data)
			return response.data

		},
		enabled: false,
	})

	useEffect(() => {
		if (isSuccess) {
			clearAllCookies()
			window.location.reload()
			navigate('/')
			console.log(data)
		}
	}, [isSuccess, data, navigate])

	useEffect(() => {
		if (isError) {
			clearAllCookies()
			window.location.reload()
			navigate('/')
			console.log(data)
		}
	}, [isError, data, navigate])

	
	return { data, logout: refetch, isLoading }
}

export default useLogout