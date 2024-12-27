import axios from "axios"



class PatientService {
	URL = "https://doc-web-rose.vercel.app";

	async getPatientInfo(patientId) {
		return await axios.get(`${this.URL}/api/patients/${patientId}`,
			{ withCredentials: true }
		)
	}

	async availableSlots(city, specialty, date, visitType, limit, page) {
		let url = `${this.URL}/api/schedules/available-slots?`
		city && (url += `city=${city}`)
		specialty && (url += `&specialty=${specialty}`)
		date && (url += `&date=${date}`)
		visitType && (url += `&visitType=${visitType}`)
		limit && (url += `&limit=${limit}`)
		page && (url += `&page=${page}`)
		return await axios.get(url, { withCredentials: true })
	}
}

export const patientService = new PatientService()
