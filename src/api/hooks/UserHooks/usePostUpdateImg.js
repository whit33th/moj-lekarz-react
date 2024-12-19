import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userServices } from '../../services/userServices'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function usePostUpdateImg() {
	const queryClient = useQueryClient()

	const { mutate, isPending, isError, isSuccess } = useMutation({
		mutationKey: ["postUpdateImg"],
		mutationFn: (img) => userServices.postImg(img),
		retry: false,

	})
	useEffect(() => {
		if (isSuccess) {
			queryClient.invalidateQueries(['getUserInfo'])
			toast.success("Plik został pomyślnie wysłany!")
		}
		if (isError) {
			toast.error("Wystąpił błąd podczas wysyłania pliku!")
		}
		if (isPending) {
			toast.loading("Wysyłanie pliku...")
		}
		toast.dismiss()
	}, [isPending, isError, isSuccess, queryClient])

	return { mutate, isPending, isError, isSuccess }
}