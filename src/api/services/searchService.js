import axios from "axios";

class SearchService {
  URL = "https://doc-web-rose.vercel.app/api/search";

  async searchDoctor(query, page, limit) {
    let url = `${this.URL}/doctors?`;

    query && (url += `query=${query}`);
    page && (url += `&page=${page}`);
    limit && (url += `&limit=${limit}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }

  async searchPatient(query, page, limit) {
    let url = `${this.URL}/patients?`;

    query && (url += `query=${query}`);
    page && (url += `&page=${page}`);
    limit && (url += `&limit=${limit}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async searchPrescription(query, page, limit) {
    let url = `${this.URL}/prescriptions?`;

    query && (url += `query=${query}`);
    page && (url += `&page=${page}`);
    limit && (url += `&limit=${limit}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async searchClinic(query, page, limit) {
    let url = `${this.URL}/clinics?`;

    query && (url += `query=${query}`);
    page && (url += `&page=${page}`);
    limit && (url += `&limit=${limit}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
  async searchPost(query, page, limit) {
    let url = `${this.URL}/posts?`;

    query && (url += `query=${query}`);
    page && (url += `&page=${page}`);
    limit && (url += `&limit=${limit}`);

    return await axios.get(url, {
      withCredentials: true,
    });
  }
}

export const searchService = new SearchService();
