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

  async getPosts({ page, limit }) {
    let url = `${this.URL}/api/posts?`;

    limit && (url += `limit=${limit}&`);
    page && (url += `page=${page}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
}

export const generalService = new GeneralService();
