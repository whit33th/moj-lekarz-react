import axios from "axios"

class UserServices {
	URL = "https://doc-web-rose.vercel.app";
	async getInfo() {
		return await axios.get(`${this.URL}/api/users/account`, {
			withCredentials: true,
		})
	}
	async postImg(userId, img) {
		return await axios.post(`${this.URL}/api/api/users/${userId}/photo`, { img })
	}
}

export const userServices = new UserServices()
