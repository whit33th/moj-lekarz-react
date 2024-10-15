import React from 'react'
import styles from './AddRecipesModal.module.css'
import Choice from '../../Modal/Choice'
import useStore from '../../../data/store'
import Dropdown from '../../Dropdown/Dropdown'

function AddRecipesModal() {
	const { setModalActive } = useStore()
	return (
		<div>
      <h1>Dodaj recepturę</h1>
      <div className={styles.modalInputBox}>
				<Dropdown options={['Fred Kamelo','Bob Marli']}/>
				
        <input className={styles.search} type="text" placeholder="Wybierz pacjenta" />
        <input className={styles.search} type="text" placeholder="Wybierz lek" />
        <button className={styles.buttDef}>Dodaj nową recepturę</button>
      </div>

			<Choice cb1={() => setModalActive(false)} choice1={'Anuluj'} cb2={console.log('Recipe added')} choice2={'Dodaj'} />
      
    </div>
	)
}

export default AddRecipesModal