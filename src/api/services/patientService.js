import axios from "axios";

class PatientService {
  URL = "https://doc-web-rose.vercel.app";

  async getPatientInfo(patientId) {
    return await axios.get(`${this.URL}/api/patients/${patientId}`, {
      withCredentials: true,
    });
  }

  async availableSlots(city, specialty, date, visitType, limit, page) {
    let url = `${this.URL}/api/schedules/available-slots?`;
    city && (url += `city=${city}`);
    specialty && (url += `&specialty=${specialty}`);
    date && (url += `&date=${date}`);
    visitType && (url += `&visitType=${visitType}`);
    limit && (url += `&limit=${limit}`);
    page && (url += `&page=${page}`);
    return await axios.get(url, { withCredentials: true });
  }

  async getPatientVisits(startDate, endDate, limit, page) {
    let url = `${this.URL}/api/patients/appointments?`;

    startDate && (url += `&startDate=${startDate}`);
    endDate && (url += `&endDate=${endDate}`);
    limit && (url += `&limit=${limit}`);
    page && (url += `&page=${page}`);

    return await axios.get(url, { withCredentials: true });
  }

  async getPatientPrescriptions() {
    let url = `${this.URL}/api/prescriptions`;

    return await axios.get(url, { withCredentials: true });
  }

  async getClinics(name, province, specialty, city, limit, page) {
    let url = `${this.URL}/api/clinics?`;
    name && (url += `&name=${name}`);
    province && (url += `&province=${province}`);
    specialty && (url += `&specialty=${specialty}`);
    city && (url += `&city=${city}`);
    limit && (url += `&limit=${limit}`);
    page && (url += `&page=${page}`);

    return await axios.get(url, { withCredentials: true });
  }
  async getClinicsById(clinicId) {
    return await axios.get(`${this.URL}/api/clinics/${clinicId}`, {
      withCredentials: true,
    });
  }
  async createVisit(data) {
    const payload = {
      doctorId: data.doctorId,
      serviceId: data.serviceId,
      clinicId: data.clinicId,
      date: data.date,
      timeSlot: data.timeSlot,
      firstVisit: data.firstVisit,
      visitType: data.visitType,
      description: data.description,
    };
    return await axios.post(`${this.URL}/api/appointments`, payload, {
      withCredentials: true,
    });
  }
  async deleteVisit(id) {
    return await axios.delete(`${this.URL}/api/patients/appointments/${id}`, {
      withCredentials: true,
    });
  }
}

export const patientService = new PatientService();
