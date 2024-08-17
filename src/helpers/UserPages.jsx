import React from 'react'

const doctor = (
	< Routes >
		<Route path="/" element={<DoctorMain />} />
		<Route path="/calendar" element={<Calendar />} />
		<Route path="/list" element={<PatientList />} />
		<Route path="/recipes" element={<Recipes />} />
		<Route path="/notifications" element={<Notifications />} />
		<Route path="/settings" element={<Settings />} />
		<Route path="/last-visits" element={<LastVisits />} />
		<Route path="/todays-visits" element={<TodaysVisits />} />
		<Route path="/profile" element={<Profil />} />

	</Routes >

)
const admin = (
	< Routes >

		<Route path="/firma" element={<AdminMain />} />

	</Routes >

)

export default UserPages