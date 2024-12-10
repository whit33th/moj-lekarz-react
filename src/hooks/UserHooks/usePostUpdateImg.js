import { useMutation } from '@tanstack/react-query'
import { userServices } from './../../services/userServices'
import useStore from '../../data/store'

export default function usePostUpdateImg() {
	const { userId } = useStore()
	const { mutate, isPending, isError, isSuccess } = useMutation({
		mutationKey: ["postUpdateImg", userId,],
		mutationFn: (img) => userServices.postImg(userId, img),
		enabled: !!userId,
		retry: false
	})

	return { mutate, isPending, isError, isSuccess }
}