import { ring2 } from 'ldrs'
import useStore from '../../../data/store'
import Choice from '../../Modal/Choice'
import styles from './ExitModal.module.css'
import useLogout from '@hooks/AuthHooks/useLogout'

function ExitModal() {
	const { logout, isLoading } = useLogout()
	const { setModalActive } = useStore()
	ring2.register()

	function loader() {

		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<l-ring-2
					size="20"
					stroke="2"
					speed="1.3"
					color="white"
				></l-ring-2 >
			</div>
		)
	}
	return (
		<div>
			<h1 className={styles.title}>
				Czy na pewno chcesz <br /> wylogować się z konta?
			</h1>

			<Choice choice1="Nie" choice2={isLoading ? loader() : "Tak"} cb1={() => setModalActive(false)} cb2={() => logout()} />
		</div>
	)

}

export default ExitModal