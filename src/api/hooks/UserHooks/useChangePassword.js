import { useEffect } from 'react'
import { userServices } from '../../services/userServices'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

function useChangePassword() {
  
    const {mutate, isPending, isError, isSuccess} = useMutation({
        mutationKey: ["changePassword"],
        mutationFn: (data) => userServices.changePassword(data),
        retry: false
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success('Hasło zmienione pomyslnie!')
        }
    }
    , [isSuccess])

    useEffect(() => {
        if (isError) {
          toast.error('Cos poszło nie tak!')
        }
    }
    , [isError])
    return {mutate, isPending, isError, isSuccess}
}


export default useChangePassword