import Choice from '../../Modal/Choice'
import useStore from '../../../data/store'
import styles from './ExitModal.module.css'
import useLogout from '../../../hooks/AuthHooks/useLogout'
function ExitModal() {
	const { logout } = useLogout()
	const { setModalActive } = useStore()
	return (
		<div>
			<h1 className={styles.title}>
				Czy na pewno chcesz <br /> wylogować się z konta?
			</h1>

			<Choice choice1="Nie" choice2="Tak" cb1={() => setModalActive(false)} cb2={() => logout()} />
		</div>
	)
}

export default ExitModal