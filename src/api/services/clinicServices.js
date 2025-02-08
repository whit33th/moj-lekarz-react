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
  async getWorkersByClinicId(
    clinicId,
    { gender, sort, ratingSort, limit, page } = {}
  ) {
    let url = `${this.URL}/api/clinics/${clinicId}/doctors?`;

    gender && (url += `gender=${gender}&`);
    sort && (url += `sort=${sort}&`);
    ratingSort && (url += `ratingSort=${ratingSort}&`);
    limit && (url += `limit=${limit}&`);
    page && (url += `page=${page}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async putDoctorInfo(doctorId, data) {
    const userData = {};
    const addressData = {};
    const doctorData = {};

    if (data.email) userData.email = data.email;
    if (data.phone) userData.phone = data.phone;

    if (data.city) addressData.city = data.city;
    if (data.province) addressData.province = data.province;
    if (data.street) addressData.street = data.street;
    if (data.home) addressData.home = data.home;
    if (data.flat) addressData.flat = data.flat;
    if (data.postIndex) addressData.post_index = data.postIndex;

    if (data.hired_at) doctorData.hired_at = data.hired_at;
    if (data.description) doctorData.description = data.description;

    return await axios.put(
      `${this.URL}/api/clinics/doctors/${doctorId}`,
      {
        userData,
        addressData,
        doctorData,
      },
      {
        withCredentials: true,
      }
    );
  }
  async putClinicInfo(data) {
    const clinicData = {};
    const addressData = {};

    if (data.name) clinicData.name = data.name;
    if (data.nip) clinicData.nip = data.nip;
    if (data.nr_license) clinicData.nr_license = data.nr_license;
    if (data.email) clinicData.email = data.email;
    if (data.phone) clinicData.phone = data.phone;
    if (data.password) clinicData.password = data.password;
    if (data.description) clinicData.description = data.description;

    if (data.city) addressData.city = data.city;
    if (data.street) addressData.street = data.street;
    if (data.province) addressData.province = data.province;
    if (data.home) addressData.home = data.home;
    if (data.flat) addressData.flat = data.flat;
    if (data.post_index) addressData.post_index = data.post_index;

    return await axios.put(
      `${this.URL}/api/clinics`,
      {
        clinicData,
        addressData,
      },
      {
        withCredentials: true,
      }
    );
  }
  async postClinic(data) {
    const clinicData = {};
    const addressData = {};

    if (data.name) clinicData.name = data.name;
    if (data.nip) clinicData.nip = data.nip;
    if (data.nr_license) clinicData.nr_license = data.nr_license;
    if (data.email) clinicData.email = data.email;
    if (data.phone) clinicData.phone = data.phone;
    if (data.password) clinicData.password = data.password;
    if (data.description) clinicData.description = data.description;
    if (data.type_visits) clinicData.type_visits = data.type_visits;

    if (data.city) addressData.city = data.city;
    if (data.street) addressData.street = data.street;
    if (data.province) addressData.province = data.province;
    if (data.home) addressData.home = data.home;
    if (data.flat) addressData.flat = data.flat;
    if (data.post_index) addressData.post_index = data.post_index;
    

    return await axios.post(
      `${this.URL}/api/clinics`,
      {
        clinicData,
        addressData,
      },
      {
        withCredentials: true,
      }
    );
  }
}

export const clinicServices = new ClinicServices();
