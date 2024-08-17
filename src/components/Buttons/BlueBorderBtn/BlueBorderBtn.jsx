import s from './BlueBorderBtn.module.css'

function BlueBorderBtn({children}) {
	return (
		<button className={s.btn}>
			{children}
		</button>
	)
}

export default BlueBorderBtn