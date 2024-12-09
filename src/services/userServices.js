import axios from "axios"

class UserServices {
	URL = "https://doc-web-rose.vercel.app";
	async getInfo() {
		return await axios.get(`${this.URL}/api/users/account`, {
			withCredentials: true,
		})
	}

}

export const userServices = new UserServices()
