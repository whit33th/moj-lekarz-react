import axios from "axios";

class ServicesService {
  URL = "https://doc-web-rose.vercel.app/api";
  async getDoctorServices(doctorId) {
    return await axios.get(`${this.URL}/doctors/${doctorId}/services`, {
      withCredentials: true,
    });
  }
  async getClinicServices(clinicId) {
    return await axios.get(`${this.URL}/clinics/${clinicId}/services`, {
      withCredentials: true,
    });
  }
}

export const servicesService = new ServicesService();
