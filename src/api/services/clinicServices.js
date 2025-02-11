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
    { gender, sort, ratingSort, limit, page, specialtyId } = {}
  ) {
    let url = `${this.URL}/api/clinics/${clinicId}/doctors?`;

    gender && (url += `gender=${gender}&`);
    sort && (url += `sort=${sort}&`);
    ratingSort && (url += `ratingSort=${ratingSort}&`);
    limit && (url += `limit=${limit}&`);
    page && (url += `page=${page}&`);
    specialtyId && (url += `specialtyId=${specialtyId}&`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async putDoctorInfo(doctorId, data) {
    // Send the data exactly as received without any transformations
    return await axios.put(
      `${this.URL}/api/clinics/doctors/${doctorId}`,
      {
        userData: data.userData,
        addressData: data.addressData,
        doctorData: data.doctorData,
        servicesIds: data.servicesIds,
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
  async postSchedule(data) {
    return await axios.post(`${this.URL}/api/clinics/schedules`, {
      doctorsIds: data.doctorsIds,
      interval: data.interval,
      dates: data.dates,
      start_time: data.start_time,
      end_time: data.end_time,
    });
  }
}

export const clinicServices = new ClinicServices();
