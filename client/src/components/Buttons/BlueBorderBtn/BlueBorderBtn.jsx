import s from './BlueBorderBtn.module.css'

function BlueBorderBtn({children, cb}) {
	return (
		<button onClick={cb} className={s.btn}>
			{children}	
		</button>
	)
}

export default BlueBorderBtn