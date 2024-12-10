import { useMutation, useQueryClient } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'
import { toast } from 'sonner'
import useStore from '../../data/store'
import { useEffect } from 'react'
function usePostPrescriptions() {
	const { setModalActive } = useStore()
	const queryClient = useQueryClient()

	const { mutate, isSuccess, isPending, isError } = useMutation({
		mutationKey: ["postPrescriptions"],
		mutationFn: (data) => doctorServices.postPrescriptions(data),
		onSuccess: () => {
			toast.success('Recepta dodana pomyslnie!')
			queryClient.invalidateQueries(['useGetPrescriptions'])
			setModalActive(false)
		},

	})


	useEffect(() => {
		if (isError) {
			toast.error('Cos poszło nie tak!')
		}
		
	}, [isError])
	useEffect(() => {
		if (isSuccess) {
			toast.success('Recepta dodana pomyslnie!')
			queryClient.invalidateQueries(['useGetPrescriptions'])
			setModalActive(false)
		}
		
	}, [isSuccess, setModalActive, queryClient])

	useEffect(() => {
		if (isPending) {
			toast.loading('Dodawanie recepty...')
		}
		toast.dismiss()
	}, [isPending])

	return { mutate, isSuccess, isPending }
}

export default usePostPrescriptions
