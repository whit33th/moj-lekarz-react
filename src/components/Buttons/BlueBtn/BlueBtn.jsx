import s from './BlueBtn.module.css'

function BlueBtn({children, cb}) {
	
	return (
		<button onClick={cb} className={s.btn}>
			{children}
		</button>
	)
}

export default BlueBtn