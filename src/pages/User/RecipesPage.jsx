import useGetPatientPrescriptions from "../../api/hooks/PatientHooks/useGetPatientPrescriptions";
import styles from "./style/RecipesPage.module.css";
import { RecipeSkeleton } from "../../components/Skeletons/RecipeSkeleton";

export default function RecipesPage() {
  const { data, isLoading } = useGetPatientPrescriptions();

  const renderSkeletons = () => (
    Array(4).fill(0).map((_, index) => <RecipeSkeleton key={index} />)
  );

  return (
    <div className={styles.recipesPage}>
      <div className={styles.activeRecipes}>
        <h1>Aktywne receptury</h1>
        <div className={styles.recipesList}>
          {isLoading ? renderSkeletons() : (
            data?.active?.map((item) => (
              <div className={styles.itemRecipes} key={item.id}>
                <div>
                  <div className={styles.label}>Lekarz</div>
                  <div className={styles.itemRecipesName}>
                    {item?.doctor?.user?.first_name +
                      " " +
                      item?.doctor?.user?.last_name}
                  </div>
                </div>

                <div>
                  <div className={styles.label}>Numer recepty</div>
                  <div className={styles.itemRecipesId}>{item.code}</div>
                </div>

                <div>
                  <div className={styles.label}>Termin ważności</div>
                  <div className={styles.itemRecipesDate}>
                    {item?.createdAt?.slice(0, 10) +
                      " — " +
                      item?.expiration_date?.slice(0, 10)}
                  </div>
                </div>

                <div>
                  <div className={styles.label}>Leki</div>
                  <div className={styles.itemRecipesDescription}>
                    {item?.medications?.map((med) => (
                      <div className={styles.medication} key={med?.id}>
                        {med?.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.activeRecipes}>
        <h1>Nieaktywne receptury</h1>
        <div className={styles.recipesList}>
          {isLoading ? renderSkeletons() : (
            data?.inactive?.map((item) => (
              <div className={styles.itemRecipes} key={item.id}>
                <div>
                  <div className={styles.label}>Lekarz</div>
                  <div className={styles.itemRecipesName}>
                    {item.doctor?.user?.first_name +
                      " " +
                      item.doctor?.user?.last_name}
                  </div>
                </div>

                <div>
                  <div className={styles.label}>Termin ważności</div>
                  <div className={styles.itemRecipesDate}>
                    {item?.createdAt?.slice(0, 10)}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
