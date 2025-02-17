import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import usePutUserInfo from "../../../api/hooks/UserHooks/usePutUserInfo";
import { motion } from "framer-motion";

function AdditionalData({ description }) {
  // const { register, handleSubmit } = useForm()

  // const { mutate } = usePutUserInfo()
  // const onSubmit = (data) => {
  // 	const formData = {
  // 		description: data.description
  // 	}
  // 	mutate(formData)
  // }
  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <textarea
        readOnly
        value={description}
        className={styles.textarea}
        placeholder="Wpisz tekst"
        // {...register("description")}
      ></textarea>
      {/* <button
				type="submit"
				style={{ width: "200px", marginLeft: "calc(100% - 200px)" }}
				className={styles.blueButt}
			>
				Zapisz zmiany
			</button> */}
    </motion.form>
  );
}

export default AdditionalData;
