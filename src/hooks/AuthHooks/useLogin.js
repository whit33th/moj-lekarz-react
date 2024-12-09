import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { authService } from "../../services/authServices"

import useStore from '../../data/store'

import { useNavigate } from 'react-router-dom'

export default function useLogin() {
  const navigate = useNavigate()
  const { role, setRole, setUserId, userId, setIsAuth, setClinicId } 
  = useStore()
  const { mutate, error, isError, isSuccess, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data) => authService.login(data),

    onSuccess: (res) => {
      console.log("GG:WP ->", res.data)
      const role = res.data.user.role
      const userId = res.data.user.id
      const clinicId = res.data.clinic_id
      console.log(role, userId, clinicId)
      setRole(role)
      setUserId(userId)
      setIsAuth(true)
      setClinicId(clinicId)
      Cookies.set("isAuth", true, { expires: 7 })
      Cookies.set("role", role, { expires: 7 })
      Cookies.set("id", userId, { expires: 7 })
      Cookies.set("clinicId", clinicId, { expires: 7 })
      navigate('/', { replace: true })

    },
    onError: (error) => {
      console.error("Defeat ->", error)
    },
  })
  return { mutate, role, error, isError, isSuccess, isPending }
}
