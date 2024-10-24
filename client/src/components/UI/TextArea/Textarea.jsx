import styles from './Textarea.module.css'

function Textarea({placeholder}) {
	return (
		<textarea placeholder={placeholder} className={styles.textarea} ></textarea>
	)
}

export default Textarea