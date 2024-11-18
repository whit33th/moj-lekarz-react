import plus from '../../../assets/img/plusBlack.png'
import styles from './AddRecipesModal.module.css'
import Choice from '../../Modal/Choice'
import useStore from '../../../data/store'
import DropdownStas from './../../Dropdown/DropdownStas';

function AddRecipesModal() {
	const { setModalActive } = useStore()
	return (
    <div>
      <h1>Dodaj recepturę</h1>
      <div className={styles.modalInputBox}>
        <DropdownStas
          placeholder={"Wybierz pacjenta"}
          options={["Fred Kamelo", "Bob Marli"]}
        />

        <DropdownStas
          placeholder={"Wybierz lek"}
          options={["Fred Kamelo", "Bob Marli"]}
        />

        <button className={styles.buttDef}>
          <span>Dodaj nową recepturę</span>
          <img src={plus} alt="plus" />
        </button>
      </div>

      <Choice
        cb1={() => setModalActive(false)}
        choice1={"Anuluj"}
        cb2={console.log("Recipe added")}
        choice2={"Dodaj"}
      />
    </div>
  );
}

export default AddRecipesModal