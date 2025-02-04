import { useQuery } from "@tanstack/react-query";

import { clinicServices } from './../../services/clinicServices';

function useGetAppointmentClinic({
  doctorId,
  patientId,
  date,
  limit,
  page,
  specialty,
}) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      "appointmentClinic",
      doctorId,
      patientId,
      date,
      limit,
      page,
      specialty,
    ],
    queryFn: () =>
      clinicServices.getAppointment(
        doctorId,
        patientId,
        date,
        limit,
        page,
        specialty
      ),

    select: (data) => {
      return data?.data || [];
    },
    staleTime: 30 * 1000,
    gcTime: 30 * 1000,
  });

  return { data, isSuccess, isLoading };
}

export default useGetAppointmentClinic;
