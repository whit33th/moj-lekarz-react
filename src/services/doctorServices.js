import axios from "axios"
class DoctorServices {
	URL = "https://doc-web-rose.vercel.app";


	async getShortInfo(id) {
		return axios.get(`${this.URL}/api/doctors/${id}/short`, {
			withCredentials: true,
		})
	}

}

export const doctorServices = new DoctorServices()
