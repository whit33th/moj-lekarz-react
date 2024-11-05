import React from 'react'
import styles from './style/RecipesPage.module.css'
import { useSelector } from 'react-redux';


function RecipesPage() {
    const stateRecipes = useSelector((state) => state.some.stateRecipes); 

    return (
        <div className={styles.recipesPage}>
            <div className={styles.activeRecipes}>
                <h1>Aktywne receptury</h1>
                <div className={styles.recipesList}>

                    {
                        stateRecipes.active.map(item =>
                            <div className={styles.itemRecipes} key={item.id}>
                                <div className={styles.itemRecipesName}>{item.userName}</div>
                                <div className={styles.itemRecipesDate}>{item.date}</div>
                                <div className={styles.itemRecipesDescription}>{item.description}</div>
                                <div className={styles.itemRecipesId}> <span>{item.id}</span></div>
                            </div>
                        )
                    }

                    
                </div>
            </div>
            <div className={styles.disactiveRecipes}>
                <h1>Ostatnio przeterminowane recepty</h1>
                <div className={styles.recipesList}>

                    {
                        stateRecipes.disactive.map(item =>
                            <div className={styles.itemRecipes} key={item.id}>
                                <div className={styles.itemRecipesName}>{item.userName}</div>
                                <div className={styles.itemRecipesDate}>{item.date}</div>
                                <div className={styles.itemRecipesDescription}>{item.description}</div>
                                <div className={styles.itemRecipesId}> <span>{item.id}</span></div>
                            </div>
                        )
                    }

                    
                </div>
            </div>

        </div>
    )
}
export default RecipesPage;