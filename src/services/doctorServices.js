import axios from "axios"



class DoctorServices {
	URL = "https://doc-web-rose.vercel.app";
	
	async getShortInfo(id) {
		return await axios.get(`${this.URL}/api/doctors/${id}/short`, {
			withCredentials: true,
		})
	}
	async getFullInfo({ id }) {
		return await axios.get(`${this.URL}/api/doctors/${id}`, {
			withCredentials: true,
		})
	}
	async getMedication() {
		return await axios.get(`${this.URL}/api/medications`, {
			withCredentials: true,
		})
	}
	async getAppointment(userId, dateFrom, dateTo, limit, offset, status) {

		let url = `${this.URL}/api/doctors/${userId}/appointments?`

		dateFrom && (url += `startDate=${dateFrom}`)
		dateTo && (url += `&endDate=${dateTo}`)
		limit && (url += `&limit=${limit}`)
		offset && (url += `&offset=${offset}`)
		status && (url += `&status=${status}`)
		return await axios.get(url, {
			withCredentials: true,
		})
	}
	async getPatientsList(userId, offset, limit) {
		let url = `${this.URL}/api/patients?sort=asc&doctorId=${userId}`

		limit && (url += `&limit=${limit}`)
		offset && (url += `&offset=${offset}`)

		return await axios.get(url, {
			withCredentials: true,
		})
	}


	async getPrescriptions(id) {
		return await axios.get(`${this.URL}/api/doctors/${id}/prescriptions`, {
			withCredentials: true,
		})
	}

	async postPrescriptions(data) {
		return await axios.post(`${this.URL}/api/prescriptions`, {
			patientId: data.patientId,
			doctorId: data.doctorId,
			medicationId: data.medicationId
		})
	}
}

export const doctorServices = new DoctorServices()
