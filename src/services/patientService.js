import axios from "axios"



class PatientService {
	URL = "https://doc-web-rose.vercel.app";
	
	async getPatientInfo(patientId) {
		return await axios.get(`${this.URL}/api/patients/${patientId}`,
			{ withCredentials: true }
		)
	}
}

export const patientService = new PatientService()
