
import { useForm } from 'react-hook-form'
import DropdownStas from '../../../components/Dropdown/DropdownStas'
import Calendar from "../../../components/DoctorPage/Home/Calendar/CalendarBlock"
import styles from "./styles.module.css" 

function Conclusions() {
	const option1 = [
		"Dariusz Adamek",
		"Option",
	]
	const reasons = ["Wolny", "Siła wyższa", "Wakacje", "Zwolnienie lekarskie"]
	const { control, register } = useForm()
	return (
		<div className={styles.workTime}>
			<div className={styles.shadow}>
				<Calendar />
			</div>

			<div className={styles.conclusions}>
				<DropdownStas
					control={control}
					name={"select1"}
					placeholder={option1[0]}
					label="Imię i nazwisko"
					options={false}
					type='disabled'
					valueOnSearchParams={false}
				/>
				<DropdownStas
					control={control}
					name={"select2"}
					placeholder={reasons[0]}
					label="Powód nieobecności"
					options={reasons}
					valueOnSearchParams={false}
				/>
			</div>
		</div>
	)
}

export default Conclusions