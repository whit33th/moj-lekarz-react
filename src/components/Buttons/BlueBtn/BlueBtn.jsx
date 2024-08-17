import s from './BlueBtn.module.css'

function BlueBtn({children}) {
	return (
		<button className={s.btn}>
			{children}
		</button>
	)
}

export default BlueBtn