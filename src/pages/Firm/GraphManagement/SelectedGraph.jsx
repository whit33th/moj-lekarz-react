import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CalendarBlockManager from "../../../components/DoctorPage/Home/Calendar/CalendarBlockManager";
import styles from "./GraphManagement.module.css";
import bucket from "@assets/img/bucketBlue.png";
import BlueBorderBtn from "../../../components/Buttons/BlueBorderBtn/BlueBorderBtn";
import BlueBtn from "./../../../components/Buttons/BlueBtn/BlueBtn";
import usePostSchedules from "../../../api/hooks/GeneralHooks/Schedules/usePostSchedules";
import { toast } from "sonner";
import { pageConfig } from "./../../../config/config";
import { motion } from "framer-motion";

function SelectedGraph() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate } = usePostSchedules();

  const initialSelectedUsers = location.state?.selectedUsers || [];
  const [selectedUsers, setSelectedUsers] = useState(
    initialSelectedUsers.map((user) => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
    }))
  );
  const [selectedDates, setSelectedDates] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [interval, setInterval] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  const handleSave = () => {
    if (!selectedDates.length) {
      return toast.error("Wybierz daty");
    }
    if (!startTime || !endTime) {
      return toast.error("Wybierz czas początkowy i końcowy");
    }
    if (!interval) {
      return toast.error("Wybierz interwał");
    }

    const data = {
      doctorsIds: selectedUsers.map((user) => user.id),
      interval: parseInt(interval),
      dates: selectedDates,
      start_time: startTime,
      end_time: endTime,
    };

    mutate(data, {
      onSuccess: () => {
        navigate(pageConfig.firm.graph);
      },
    });
  };

  useEffect(() => {
    console.log("Current selected users:", selectedUsers);
  }, [selectedUsers]);

  return (
    <div className={styles.handleContainer}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.card}
      >
        <CalendarBlockManager
          onDateSelect={handleDateSelect}
          selectedDates={selectedDates}
        />
        <div className={styles.hr}>
          <hr />
        </div>

        <div className={styles.center}>
          <h2>Wprowadź godziny pracy</h2>
          <div className={styles.time}>
            <p>Od</p>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <p>Do</p>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.hr}>
          <hr />
        </div>

        <div className={styles.center}>
          <h2>Wybierz terminy wizyt</h2>
          <div className={styles.center}>
            <div>
              <input
                type="radio"
                name="interval"
                id="interval-30"
                value="30"
                onChange={(e) => setInterval(e.target.value)}
              />
              <p>Co 30 minut</p>
            </div>
            <div>
              <input
                type="radio"
                name="interval"
                id="interval-60"
                value="60"
                onChange={(e) => setInterval(e.target.value)}
              />
              <p>Co 60 minut</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.card}
      >
        {selectedUsers.length > 0 ? (
          <>
            {selectedUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={styles.userRow}
              >
                <span>{user.name}</span> 
                <span>{user.phone}</span>
                <div className={styles.btnDiv}>
                  <BlueBorderBtn cb={() => handleRemoveUser(user.id)}>
                    <img src={bucket} alt="Remove user" />
                  </BlueBorderBtn>
                </div>
              </motion.div>
            ))}
            <div
              
            >
              <BlueBtn cb={handleSave}>Zapisz i dodaj do kalendarza</BlueBtn>
            </div>
          </>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            No users selected
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default SelectedGraph;
