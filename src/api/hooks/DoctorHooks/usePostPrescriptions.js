import { useMutation, useQueryClient } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'
import { toast } from 'sonner'
import useStore from '@data/store'
import { useEffect } from 'react'
function usePostPrescriptions() {
	const { setModalActive } = useStore()
	const queryClient = useQueryClient()

	const { mutate, isSuccess, isError, error } = useMutation({
		mutationKey: ["postPrescriptions"],
		mutationFn: (data) => doctorServices.postPrescriptions(data),
	})


	useEffect(() => {
		if (isError) {
			toast.error('Cos poszło nie tak!')
			console.log(error)
		}


	}, [isError, error])
	useEffect(() => {
		if (isSuccess) {
			toast.success('Recepta dodana pomyslnie!')
			queryClient.invalidateQueries(['useGetPrescriptions'])
			setModalActive(false)
		}

	}, [isSuccess, setModalActive, queryClient])

	

	return { mutate, isSuccess }
}

export default usePostPrescriptions
