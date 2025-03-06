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

  async getPosts({ page, limit = 10 }) {
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
  async getAdminReviews() {
    let url = `${this.URL}/api/admins/reviews?`;

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async getAdminModerateReviews() {
    let url = `${this.URL}/api/admins/reviews/moderate?`;

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
  async getAdminStatsDetails() {
    return await axios.get(`${this.URL}/api/admins/statistics/details`, {
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
  async getSchedules(year, month, doctorIds) {
    let url = `${this.URL}/api/schedules?`;

    year && (url += `year=${year}&`);
    month && (url += `month=${month}&`);
    doctorIds && (url += `doctorIds=${doctorIds}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async putTimetable(timetablesData) {
    return await axios.put(
      `${this.URL}/api/clinics/timetable`,
      timetablesData,
      { withCredentials: true }
    );
  }
  async postPosts(id, data) {
    const formData = new FormData();
    formData.append("image", data.photo);
    formData.append("title", data.title);
    formData.append("content", data.content);

    return await axios.post(
      `${this.URL}/api/posts/categories/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
  async putPosts(id, data) {
    const formData = new FormData();
    formData.append("image", data.photo);
    formData.append("title", data.title);
    formData.append("content", data.content);

    return await axios.put(`${this.URL}/api/posts/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async deletePosts(id) {
    return await axios.delete(`${this.URL}/api/posts/${id}`, {
      withCredentials: true,
    });
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

  async getNotion() {
    return await axios.get(`${this.URL}/api/notions`, {
      withCredentials: true,
    });
  }
  async getCategories() {
    return await axios.get(`${this.URL}/api/categories`, {
      withCredentials: true,
    });
  }
  async postNotion(text) {
    return await axios.post(
      `${this.URL}/api/notions`,
      {
        content: text,
      },
      {
        withCredentials: true,
      }
    );
  }
  async deleteNotion(notionId) {
    return await axios.delete(`${this.URL}/api/notions/${notionId}`, {
      withCredentials: true,
    });
  }

  async postDocument(id, file) {
    const formData = new FormData();
    formData.append("file", file);

    return await axios.post(
      `${this.URL}/api/doctors/documents/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async getDocumentsById(id) {
    return await axios.get(`${this.URL}/api/doctors/documents/${id}`, {
      withCredentials: true,
    });
  }
  async getDocuments() {
    return await axios.get(`${this.URL}/api/patients/documents`, {
      withCredentials: true,
    });
  }
  async getReport(startDate, endDate) {
    let url = `${this.URL}/api/admins/statistics/details/file?`;
    if (startDate) url += `start_date=${startDate}&`;
    if (endDate) url += `end_date=${endDate}`;
    return await axios.get(url, {
      withCredentials: true,
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    });
  }
  async getAllTags() {
    return await axios.get(`${this.URL}/api/tags`, {
      withCredentials: true,
    });
  }
  async postReview(data) {
    return await axios.post(
      `${this.URL}/api/reviews`,
      {
        doctorId: data.doctorId,
        rating: data.rating,
        comment: data.comment,
        tagsIds: data.tagsIds,
      },
      {
        withCredentials: true,
      }
    );
  }
}

export const generalService = new GeneralService();
