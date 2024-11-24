import Cookies from 'js-cookie'
export default function clearAllCookies() {
	const allCookies = Cookies.get()
	Object.keys(allCookies).forEach((cookieName) => {
		Cookies.remove(cookieName)
	})
}