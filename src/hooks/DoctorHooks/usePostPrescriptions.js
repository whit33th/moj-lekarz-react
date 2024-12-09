import { useMutation, useQueryClient } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'
import { toast } from 'sonner'
import useStore from '../../data/store'
function usePostPrescriptions() {
	const { setModalActive } = useStore()
	const queryClient = useQueryClient()

	const { mutate, isSuccess, } = useMutation({
		mutationKey: ["postPrescriptions"],
		mutationFn: (data) => doctorServices.postPrescriptions(data),
		onSuccess: () => {
			toast.success('Recepta dodana pomyslnie!')
			queryClient.invalidateQueries(['useGetPrescriptions'])
			setModalActive(false)
		},
		onError: (error) => {
			toast.error(error.response.data.message)
		},
	})

	return { mutate, isSuccess }
}

export default usePostPrescriptions
