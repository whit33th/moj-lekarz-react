import useStore from '../../../data/store'
import styles from './BlurLayer.module.css'

function BlurLayer() {

	const { searchActive } = useStore()
	return (
		<div  className={`${styles.blur} ${searchActive ? styles.blurActive : ''}`}></div>
	)
}

export default BlurLayer