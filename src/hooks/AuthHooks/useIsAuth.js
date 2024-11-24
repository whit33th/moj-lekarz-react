import { useEffect } from 'react'
import useStore from '../../data/store'
import { useQuery } from '@tanstack/react-query'
import { authService } from '../../services/authServices'
import axios from 'axios'
import Cookies from 'js-cookie'

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
			console.log(data, 'cool')
			
		}
	}, [isSuccess, setIsAuth, data])

	useEffect(() => {
		if (isError) {
			setIsAuth(false)
			console.log(data, 'fool')
			Cookies.remove('isAuth')
		}
	}, [isError, setIsAuth, data])

	return { data, isSuccess, isError, checkIsAuth: refetch }
}