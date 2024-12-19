import { useEffect } from 'react'
import useStore from '@data/store'
import { useQuery } from '@tanstack/react-query'
import { authService } from '@services/authServices'
import axios from 'axios'
import clearAllCookies from './../../../utils/deleteAllCookies'
export default function useIsAuth() {



	const { setIsAuth } = useStore()
	axios.defaults.withCredentials = true
	const { data, isSuccess, isError, refetch } = useQuery({
		queryKey: ['checkIsAuth'],
		queryFn: () => authService.sessionValid(),
		retry: false,
		enabled: false


	})

	useEffect(() => {
		if (isSuccess) {
			setIsAuth(true)
		}
	}, [isSuccess, setIsAuth, data])

	useEffect(() => {
		if (isError || !isSuccess) {
			// clearAllCookies()
			setIsAuth(false)
			
		}
	}, [isError, setIsAuth, isSuccess, data])

	return { data, isSuccess, isError, checkIsAuth: refetch }
}