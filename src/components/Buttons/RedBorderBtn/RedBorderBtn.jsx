import s from './RedBorderBtn.module.css'

function RedBorderBtn({children, cb}) {
	return (
		<button onClick={cb} className={s.btn}>
			{children}	
		</button>
	)
}

export default RedBorderBtn