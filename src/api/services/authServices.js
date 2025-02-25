import axios from "axios";
class AuthServices {
  URL = "https://doc-web-rose.vercel.app";

  async login(data) {
    return await axios.post(
      `${this.URL}/login`,
      {
        loginParam: data.email.toLowerCase(),
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
  }
  async logout() {
    return await axios.get(`${this.URL}/logout`, {
      withCredentials: true,
    });
  }
  async registration(data) {
    return await axios.post(`${this.URL}/register`, {
      email: data.email.toLowerCase(),
      password: data.password,
    });
  }
  async google() {
    window.location.href = "http://localhost:5173/auth/google";
  }
  async sessionValid() {
    return await axios.get(`${this.URL}/api/protected`, {
      withCredentials: true,
    });
  }
  async tokenLink(data) {
    return await axios.post(
      `${this.URL}/forgot-password`,
      { email: data?.email },
      {
        withCredentials: true,
      }
    );
  }
  async resetPassword(data) {
    return await axios.post(
      `${this.URL}/set-password`,
      { token: data.token, newPassword: data.newPassword },
      {
        withCredentials: true,
      }
    );
  }
}

export const authService = new AuthServices();
