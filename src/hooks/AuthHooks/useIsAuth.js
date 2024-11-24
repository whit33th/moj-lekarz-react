import { useEffect } from 'react'
import useStore from '../../data/store'
import { useQuery } from '@tanstack/react-query'
import { authService } from '../../services/authServices'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router-dom'

export default function useIsAuth() {
	const location = useLocation()
	const { setIsAuth } = useStore()
	axios.defaults.withCredentials = true

	const { data, isSuccess, isError } = useQuery({
		queryKey: ['checkIsAuth'],
		queryFn: () => authService.sessionValid(),
		retry: false,
	})

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isSuccess) {
				setIsAuth(true)
			}
		}, 3000) // Задержка 3 секунды

		return () => clearTimeout(timer) // Очистка таймера, если компонент будет размонтирован
	}, [isSuccess, setIsAuth, location.pathname])

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isError) {
				setIsAuth(false)
				Cookies.remove('isAuth')
			}
		}, 3000) // Задержка 3 секунды

		return () => clearTimeout(timer) // Очистка таймера, если компонент будет размонтирован
	}, [isError, setIsAuth, location.pathname])

	return { data, isSuccess, isError }
}
