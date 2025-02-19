import { motion } from "framer-motion";
import useGetPatientPrescriptions from "../../api/hooks/PatientHooks/useGetPatientPrescriptions";
import { RecipeSkeleton } from "../../components/Skeletons/RecipeSkeleton";
import styles from "./style/RecipesPage.module.css";

export default function RecipesPage() {
  const { data, isLoading } = useGetPatientPrescriptions();

  const renderSkeletons = () =>
    Array(4)
      .fill(0)
      .map((_, index) => <RecipeSkeleton key={index} />);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.recipesPage}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.activeRecipes}
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Aktywne receptury
        </motion.h1>
        <div className={styles.recipesList}>
          {isLoading
            ? renderSkeletons()
            : data?.active?.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={styles.itemRecipes}
                  key={item.id}
                >
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
                </motion.div>
              ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={styles.activeRecipes}
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nieaktywne recepty
        </motion.h1>
        <div className={styles.recipesList}>
          {isLoading
            ? renderSkeletons()
            : data?.inactive?.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={styles.itemRecipes}
                  key={item.id}
                >
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
                </motion.div>
              ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
