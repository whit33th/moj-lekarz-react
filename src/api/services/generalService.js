import axios from 'axios'

class GeneralService {
	URL = "https://doc-web-rose.vercel.app"
	async getCities() {
		return await axios.get(`${this.URL}/api/clinics/cities`, { withCredentials: true })
	}
}

export const generalService = new GeneralService