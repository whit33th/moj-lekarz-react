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
	async getAppointment(userId, dateFrom, dateTo, limit, page, status) {

		let url = `${this.URL}/api/doctors/${userId}/appointments?`

		dateFrom && (url += `startDate=${dateFrom}`)
		dateTo && (url += `&endDate=${dateTo}`)
		limit && (url += `&limit=${limit}`)
		page && (url += `&page=${page}`)
		status && (url += `&status=${status}`)
		return await axios.get(url, {
			withCredentials: true,
		})
	}
	async getPatientsList(userId, page, limit) {
		let url = `${this.URL}/api/patients?sort=asc&doctorId=${userId}`

		limit && (url += `&limit=${limit}`)
		page && (url += `&page=${page}`)

		return await axios.get(url, {
			withCredentials: true,
		})
	}


	async getPrescriptions(id, limit, page, sort) {

		let url = `${this.URL}/api/doctors/${id}/prescriptions?`

		limit && (url += `limit=${limit}`)
		page && (url += `&page=${page}`)
		sort && (url += `&sort=${sort}`)

		return await axios.get(url, {
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
	async postMedications(data) {
		return await axios.post(`${this.URL}/api/medications`, {
			name: data.name
		})
	}
}

export const doctorServices = new DoctorServices()
