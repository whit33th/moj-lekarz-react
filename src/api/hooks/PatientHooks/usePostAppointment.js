import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { patientService } from '../../services/patientService'

export default function usePostAppointment() {
	
	const { mutate, isPending, isError, isSuccess } = useMutation({
		mutationKey: ["postAppointment"],
		mutationFn: (data) => patientService.createVisit(data),
		
	})
	useEffect(() => {
		if (isSuccess) {
			toast.success("Plik został pomyślnie wysłany!")
		}
		if (isError) {
			toast.error("Wystąpił błąd podczas wysyłania pliku!")
		}
		if (isPending) {
			toast.loading("Wysyłanie pliku...")
		}
		toast.dismiss()
	}, [isPending, isError, isSuccess])

	return { mutate, isPending, isError, isSuccess }
}