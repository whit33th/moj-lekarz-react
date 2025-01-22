import axios from "axios";

class UserServices {
  URL = "https://doc-web-rose.vercel.app";
  async getInfo() {
    return await axios.get(`${this.URL}/api/users/account`, {
      withCredentials: true,
    });
  }
  async putInfo(formData) {
	console.log(formData)
    const data = {
      userData: {
        email: formData.email,
        phone: formData.phone,
        first_name: formData.first_name,
        last_name: formData.last_name,
        birthday: formData.birthday || "01-01-2000",
        pesel: formData.pesel || "",
        gender: formData.gender || "male", // Add gender field
      },
      addressData: {
        city: formData.city,
        province: formData.province || "",
        street: formData.street,
        home: formData.home,
        flat: formData.flat,
        post_index: formData.post_index,
      },
      doctorData: {
        hired_at: formData.hired_at || "",
        description: formData.description || "",
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
    return await axios.put(`${this.URL}/api/users/password`, data, {
      withCredentials: true,
    });
  }

  async postImg(img) {
    return await axios.post(`${this.URL}/api/users/photo`, img, {
      withCredentials: true,
    });
  }
}

export const userServices = new UserServices();
