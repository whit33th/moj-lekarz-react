import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../../pages/User/style/RecipesPage.module.css'

export const RecipeSkeleton = () => {
  return (
    <div className={styles.itemRecipes}>
      <div>
        <div className={styles.label}>Lekarz</div>
        <Skeleton width={200} height={24} />
      </div>

      <div>
        <div className={styles.label}>Numer recepty</div>
        <Skeleton width={150} height={24} />
      </div>

      <div>
        <div className={styles.label}>Termin ważności</div>
        <Skeleton width={180} height={24} />
      </div>

      <div>
        <div className={styles.label}>Leki</div>
        <div className={styles.itemRecipesDescription}>
          <Skeleton width={120} height={24} style={{ marginRight: '8px' }} />
          <Skeleton width={140} height={24} />
        </div>
      </div>
    </div>
  )
}
