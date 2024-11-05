import React from 'react'
import styles from './style/ProfileClinicAbout.module.css'

 function ProfileClinicAbout(props) {
  return (
    <div className={styles.descriptionBlock}>
      <p>{props.desctiption}</p>
    </div>
  )
}

export default ProfileClinicAbout