import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useEffect to manage lifecycle
import Calendar from "./../../../components/DoctorPage/Home/Calendar/CalendarBlock";
import styles from "./GraphManagement.module.css";
import bucket from "../../../assets/img/bucketBlue.png";
import BlueBorderBtn from "../../../components/Buttons/BlueBorderBtn/BlueBorderBtn";

function SelectedGraph() {
  const location = useLocation();
  const initialSelectedUsers = location.state?.selectedUsers || []; // Получаем переданных пользователей

  const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers); // Local state for selected users

  const handleRemoveUser = (userId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    ); 
  };

  useEffect(() => {
    console.log("Current selected users:", selectedUsers); 
  }, [selectedUsers]); 

  return (
    <div className={styles.handleContainer}>
      <div className={styles.card}>
        <Calendar />
      </div>
      <div className={styles.card}>
        {selectedUsers.length > 0 ? (
          selectedUsers.map((user) => (
            <div className={styles.userRow} key={user.id}>
              <span>{user.name}</span> <span>{user.phone}</span>
              <div className={styles.btnDiv}>
                <BlueBorderBtn cb={() => handleRemoveUser(user.id)}>
                  <img src={bucket} alt="Remove user" />
                </BlueBorderBtn>
              </div>
            </div>
          ))
        ) : (
          <p>No users selected</p>
        )}
      </div>
    </div>
  );
}

export default SelectedGraph;
