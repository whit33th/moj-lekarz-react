import { useQuery } from "@tanstack/react-query"
import { authService } from "../../services/AuthServices"
import useStore from '../../data/store'

export default function useSessionValid() {
  const { setRole } = useStore()
  const { data } = useQuery({
    queryKey: ["sessionValid"],
    queryFn: authService.sessionValid,
    select: data => data.data,
    onError: () => {
      setRole(null)
    },


  })

  return { data }
}
