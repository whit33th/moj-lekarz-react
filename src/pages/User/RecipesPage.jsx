import useGetPatientPrescriptions from "../../api/hooks/PatientHooks/useGetPatientPrescriptions";
import useStore from "../../data/store";
import styles from "./style/RecipesPage.module.css";

function RecipesPage() {
  const { stateRecipes } = useStore();

  const { data } = useGetPatientPrescriptions({});
  

  return (
    <div className={styles.recipesPage}>
      <div className={styles.activeRecipes}>
        <h1>Aktywne receptury</h1>
        <div className={styles.recipesList}>
          {data?.prescriptions?.map((item) => (
            <div className={styles.itemRecipes} key={item.id}>
              <div>
                <div className={styles.label}>Lekarz</div>
                <div className={styles.itemRecipesName}>
                  {item.doctor?.user?.first_name + ' ' + item.doctor?.user?.last_name}
                </div>
              </div>

              <div>
                <div className={styles.label}>Numer recepty</div>
                <div className={styles.itemRecipesId}>
                  {item.code}
                </div>
              </div>
              
              <div>
                <div className={styles.label}>Termin ważności</div>
                <div className={styles.itemRecipesDate}>
                  {item.createdAt.slice(0, 10) + " — " + item.expiration_date.slice(0, 10)}
                </div>
              </div>

              <div>
                <div className={styles.label}>Leki</div>
                <div className={styles.itemRecipesDescription}>
                  {item.medications?.map((med) => (
                    <div className={styles.medication} key={med.id}>
                      {med.name}
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          ))}
        </div>
      </div>
      <div className={styles.disactiveRecipes}>
        <h1>Ostatnio przeterminowane recepty</h1>
        <div className={styles.recipesList}>
          {stateRecipes.disactive.map((item) => (
            <div className={styles.itemRecipes} key={item.id}>
              <div>
                <div className={styles.label}>Lekarz</div>
                <div className={styles.itemRecipesName}>{item.userName}</div>
              </div>

              <div>
                <div className={styles.label}>Data</div>
                <div className={styles.itemRecipesDate}>{item.date}</div>
              </div>

              <div>
                <div className={styles.label}>Opis</div>
                <div className={styles.itemRecipesDescription}>
                  {item.description}
                </div>
              </div>

              <div>
                <div className={styles.label}>Numer recepty</div>
                <div className={styles.itemRecipesId}>
                  {item.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default RecipesPage;
