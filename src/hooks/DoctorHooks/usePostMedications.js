import { useMutation, useQueryClient } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'
import { toast } from 'sonner'
import useStore from '../../data/store'
import { useEffect } from 'react'
function usePostMedications() {
	const { setModalActive } = useStore()
	const queryClient = useQueryClient()

	const { mutate, isSuccess, isPending, isError } = useMutation({
		mutationKey: ["usePostMedications"],
		mutationFn: (data) => doctorServices.postMedications(data),

	})


	useEffect(() => {
		if (isError) {
			toast.error('Cos poszło nie tak!')
		}

	}, [isError])
	useEffect(() => {
		if (isSuccess) {
			toast.success('Lek dodany pomyslnie!')
			queryClient.invalidateQueries(['useGetMedications'])
		}
	}, [isSuccess, setModalActive, queryClient])

	useEffect(() => {
		if (isPending) {
			toast.loading('Dodawanie leku...')
		}
		toast.dismiss()
	}, [isPending])

	return { mutate, isSuccess, isPending }
}

export default usePostMedications
