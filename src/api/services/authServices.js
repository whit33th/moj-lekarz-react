import axios from "axios";
class AuthServices {
  URL = "https://doc-web-rose.vercel.app";

  async login(data) {
    return await axios.post(
      `${this.URL}/login`,
      {
        loginParam: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
  }
  async registration(data) {
    return await axios.post(`${this.URL}/register`, {
      email: data.email,
      password: data.password,
    });
  }
  async google(data) {
    return await axios.post(`${this.URL}/register`, {
      email: data.email,
      password: data.password,
    });
  }
  async sessionValid() {
    return await axios.get(`${this.URL}/api/protected`, {
      withCredentials: true,
    });
  }
  async forgotPassword(data) {
    return await axios.post(`${this.URL}/forgot-password`, {email: data?.email}, {
      withCredentials: true,
    });
  }

  async logout() {
    return await axios.get(`${this.URL}/logout`, {
      withCredentials: true,
    });
  }
}

export const authService = new AuthServices();
