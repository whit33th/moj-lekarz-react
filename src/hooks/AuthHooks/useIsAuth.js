import { useEffect } from 'react'
import useStore from '../../data/store'

export default function useIsAuth() {
	const { setIsAuth } = useStore()
console.log(document.cookie)
	useEffect(() => {
		const token = document.cookie.split('; ').some((cookie) => cookie.startsWith('connect.sid'))

		token ?
			(setIsAuth(true))
			:
			(setIsAuth(false))
			
	}, [setIsAuth])

}