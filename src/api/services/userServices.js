import axios from "axios";

class UserServices {
  URL = "https://doc-web-rose.vercel.app";
  async getInfo() {
    return await axios.get(`${this.URL}/api/users/account`, {
      withCredentials: true,
    });
  }
  async putInfo(formData) {
    const data = {
      userData: {
        email: formData.email,
        phone: formData.phone,
        first_name: formData.first_name,
        last_name: formData.last_name,
        birthday: formData.birthday || "01-01-2000",
        pesel: formData.pesel || "",
        gender: formData.gender || "male",

        name: formData.firm || "",
        nip: formData.nip || "",
        nr_license: formData.license || "",
        description: formData.description || "",
      },
      addressData: {
        city: formData.city,
        province: formData.province || "",
        street: formData.street,
        home: formData.home,
        flat: formData.flat,
        post_index: formData.post_index,
      },
    };
    return await axios.put(`${this.URL}/api/users`, data, {
      withCredentials: true,
    });
  }

  async changePassword(formData) {
    const data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    return await axios.patch(`${this.URL}/api/users/password`, data, {
      withCredentials: true,
    });
  }

  async postImg(img) {
    return await axios.post(`${this.URL}/api/users/photo`, img, {
      withCredentials: true,
    });
  }
  async deleteAccount() {
    return await axios.delete(`${this.URL}/api/users`, {
      withCredentials: true,
    });
  }
}

export const userServices = new UserServices();
