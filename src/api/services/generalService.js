import axios from "axios";

class GeneralService {
  URL = "https://doc-web-rose.vercel.app";
  async getCities() {
    return await axios.get(`${this.URL}/api/clinics/cities`, {
      withCredentials: true,
    });
  }
  async getSpecialties() {
    return await axios.get(`${this.URL}/api/specialties`, {
      withCredentials: true,
    });
  }
  async getSpecialtyById(specialtyId) {
    return await axios.get(`${this.URL}/api/specialties/${specialtyId}`, {
      withCredentials: true,
    });
  }
  async getClinicSpecialties(clinicId) {
    return await axios.get(`${this.URL}/api/clinic/${clinicId}/specialties`, {
      withCredentials: true,
    });
  }

  async getPosts({ page, limit }) {
    let url = `${this.URL}/api/posts?`;

    limit && (url += `limit=${limit}&`);
    page && (url += `page=${page}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }

  async getDoctorReviews(doctorId, page = 1, limit = 10) {
    let url = `${this.URL}/api/doctors/${doctorId}/reviews?`;

    limit && (url += `limit=${limit}&`);
    page && (url += `page=${page}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async getClinicReviews(clinicId, sortDate, sortRating, page = 1, limit = 10) {
    let url = `${this.URL}/api/clinics/${clinicId}/reviews?`;

    sortDate && (url += `sortDate=${sortRating}&`);
    sortRating && (url += `sortRating=${sortRating}`);
    limit && (url += `limit=${limit}&`);
    page && (url += `page=${page}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async getClinicStats() {
    return await axios.get(`${this.URL}/api/statistics/province`, {
      withCredentials: true,
    });
  }
}

export const generalService = new GeneralService();
