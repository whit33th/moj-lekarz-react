import { useQuery } from "@tanstack/react-query"
import { doctorServices } from '../../services/doctorServices'
import Cookies from 'js-cookie'
import useStore from '../../data/store'
import { useEffect } from 'react'

function useGetShortInfo(id) {
	const { setClinicId }
		= useStore()
	const { data, isSuccess } = useQuery({
		queryKey: ["getShortInfo", id],
		queryFn: () => doctorServices.getShortInfo(id),
		select: (data) => data.data,
		enabled: !!id,
		staleTime: 60000,
		gcTime: 60000
	})

	console.log(data, "useGetShortInfo")
	useEffect(() => {
		if (isSuccess) {
			const clinicId = data.clinic_id
			setClinicId(clinicId)
			Cookies.set("clinicId", clinicId, { expires: 7 } )
		}
	}, [isSuccess, data, setClinicId])


	return { data, isSuccess }
}

export default useGetShortInfo
