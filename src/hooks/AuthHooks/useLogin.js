import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { authService } from "../../services/authServices"

import useStore from '../../data/store'

import { useNavigate } from 'react-router-dom'

export default function useLogin() {
  const navigate = useNavigate()
  const { role, setRole, setUserId, setIsAuth } 
  = useStore()
  const { mutate, error, isError, isSuccess, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data) => authService.login(data),

    onSuccess: (res) => {
      console.log("GG:WP ->", res.data)
      const role = res.data.user.role
      const userId = res.data.user.id
      setRole(role)
      setUserId(userId)
      setIsAuth(true)
     
      Cookies.set("isAuth", true, { expires: 7, secure: true, sameSite: "strict", domain: "", path: '' })
      Cookies.set("role", role, { expires: 7, secure: true, sameSite: "strict", domain: "", path: '' })
      Cookies.set("id", userId, { expires: 7, secure: true, sameSite: "strict", domain: "", path: '' })
      
      navigate('/', { replace: true })

    },
    onError: (error) => {
      console.error("Defeat ->", error)
    },
  })
  return { mutate, role, error, isError, isSuccess, isPending }
}
