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

    sortDate && (url += `sortDate=${sortDate}&`);
    sortRating && (url += `sortRating=${sortRating}`);
    limit && (url += `limit=${limit}&`);
    page && (url += `page=${page}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async getAdminReviews(status) {
    let url = `${this.URL}/api/admins/reviews?`;

    status && (url += `status=${status}&`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async getClinicProvinceStats() {
    return await axios.get(`${this.URL}/api/statistics/province`, {
      withCredentials: true,
    });
  }
  async getClinicStats() {
    return await axios.get(`${this.URL}/api/clinics/statistics`, {
      withCredentials: true,
    });
  }
  async getDoctorStats() {
    return await axios.get(`${this.URL}/api/doctors/statistics`, {
      withCredentials: true,
    });
  }
  async getAdminStats() {
    return await axios.get(`${this.URL}/api/admins/statistics`, {
      withCredentials: true,
    });
  }
  async putSchedules(id, data) {
    return await axios.put(
      `${this.URL}/api/schedules/${id}`,
      {
        date: data.date,
        start_time: data.start_time,
        end_time: data.end_time,
      },
      {
        withCredentials: true,
      }
    );
  }
  async postPosts(id, data) {
    return await axios.post(
      `${this.URL}/api/posts/categories/${id}`,
      {
        photo: data.photo,
        title: data.title,
        content: data.content,
      },
      {
        withCredentials: true,
      }
    );
  }
  async deletePosts(id) {
    return await axios.delete(`${this.URL}/api/posts/${id}`, {
      withCredentials: true,
    });
  }

  async putPosts(id, data) {
    return await axios.put(
      `${this.URL}/api/posts/${id}`,
      {
        photo: data.photo,
        title: data.title,
        content: data.content,
      },
      {
        withCredentials: true,
      }
    );
  }
  async deleteReview(id) {
    return await axios.delete(`${this.URL}/api/admins/reviews/${id}`, {
      withCredentials: true,
    });
  }
  async acceptReview(id) {
    return await axios.patch(
      `${this.URL}/api/admins/reviews/${id}/moderate`,
      {
        status: "approved",
        moderationComment: "Nice comment",
      },
      {
        withCredentials: true,
      }
    );
  }
}

export const generalService = new GeneralService();
