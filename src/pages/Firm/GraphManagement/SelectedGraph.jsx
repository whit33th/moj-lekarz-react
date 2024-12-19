import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import CalendarBlock from "./../../../components/DoctorPage/Home/Calendar/CalendarBlock"
import styles from "./GraphManagement.module.css"
import bucket from "@assets/img/bucketBlue.png"
import BlueBorderBtn from "../../../components/Buttons/BlueBorderBtn/BlueBorderBtn"
import BlueBtn from "./../../../components/Buttons/BlueBtn/BlueBtn"

function SelectedGraph() {
  const location = useLocation()
  const initialSelectedUsers = location.state?.selectedUsers || []
  const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers)
  const handleRemoveUser = (userId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    )
  }

  useEffect(() => {
    console.log("Current selected users:", selectedUsers)
  }, [selectedUsers])

  return (
    <div className={styles.handleContainer}>
      <div className={styles.card}>
        <CalendarBlock />
        <div className={styles.hr}>
          <hr />
        </div>

        <div className={styles.center}>
          <h2>Wprowadź godziny pracy</h2>
          <div className={styles.time}>
            <p>Od</p>
            <input type="time" placeholder="8:15" />
            <p>Do</p>
            <input type="time" placeholder="21:45" />
          </div>
        </div>

        <div className={styles.hr}>
          <hr />
        </div>

        <div className={styles.center}>
          <h2>Wybierz terminy wizyt</h2>
          <div className={styles.center}>
            <div>
              <input type="checkbox" name="interval-30" id="interval-30" />
              <p>Co 30 minut</p>
            </div>
            <div>
              <input type="checkbox" name="interval-60" id="interval-60" />
              <p>Co 60 minut</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        {selectedUsers.length > 0 ? (
          <>
            {selectedUsers.map((user) => (
              <div className={styles.userRow} key={user.id}>
                <span>{user.name}</span> <span>{user.phone}</span>
                <div className={styles.btnDiv}>
                  <BlueBorderBtn cb={() => handleRemoveUser(user.id)}>
                    <img src={bucket} alt="Remove user" />
                  </BlueBorderBtn>
                </div>
              </div>
            ))}
            <BlueBtn>Zapisz i dodaj do kalendarza</BlueBtn>
          </>
        ) : (
          <p>No users selected</p>
        )}
      </div>
    </div>
  )
}

export default SelectedGraph
