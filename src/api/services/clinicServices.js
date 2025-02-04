import axios from "axios";

class ClinicServices {
  URL = "https://doc-web-rose.vercel.app";

  async getShortInfo(id) {
    return await axios.get(`${this.URL}/api/doctors/${id}/short`, {
      withCredentials: true,
    });
  }
  async getFullInfo({ id }) {
    return await axios.get(`${this.URL}/api/doctors/${id}`, {
      withCredentials: true,
    });
  }
  async getMedication() {
    return await axios.get(`${this.URL}/api/medications`, {
      withCredentials: true,
    });
  }
  async getAppointment(doctorId, patientId, date, limit, page, specialty) {
    let url = `${this.URL}/api/clinics/appointments?`;

    doctorId && (url += `doctorId=${doctorId}`);
    patientId && (url += `patientId=${patientId}`);
    date && (url += `&date=${date}`);
    limit && (url += `&limit=${limit}`);
    page && (url += `&page=${page}`);
    specialty && (url += `&specialty=${specialty}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async getAppointmentForUser(patientId, limit, page) {
    let url = `${this.URL}/api/doctors/appointments?`;

    patientId && (url += `&patientId=${patientId}`);
    limit && (url += `&limit=${limit}`);
    page && (url += `&page=${page}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async getPatientsList(page, limit) {
    let url = `${this.URL}/api/patients?sort=ASC`;

    limit && (url += `&limit=${limit}`);
    page && (url += `&page=${page}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }

  async getPrescriptions(limit, page, sort) {
    let url = `${this.URL}/api/prescriptions?`;

    limit && (url += `limit=${limit}`);
    page && (url += `&page=${page}`);
    sort && (url += `&sort=${sort}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }

  async postPrescriptions(data) {
    return await axios.post(`${this.URL}/api/prescriptions`, {
      patientId: data.patientId,
      medicationsIds: data.medicationsIds,
      expirationDate: data.expirationDate,
    });
  }
  async postMedications(data) {
    return await axios.post(`${this.URL}/api/medications`, {
      name: data.name,
    });
  }
}

export const clinicServices = new ClinicServices();
