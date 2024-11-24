import axios from "axios"
import useStore from '../data/store'

class AuthServices {
  URL = "https://doc-web-rose.vercel.app";

  login(data) {

    return axios.post(
      `${this.URL}/login`,
      {
        loginParam: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    )


  }

  registration(data) {
    return axios.post(`${this.URL}/register`, {
      userData: {
        email: data.email,
        password: data.password,
      },
      patientData: {
        market_inf: data.checkbox,
      },
    })
  }

  sessionValid() {

    return axios.get("https://doc-web-rose.vercel.app/api/protected", {
      withCredentials: true, 
      
    })
  }


}

export const authService = new AuthServices()
