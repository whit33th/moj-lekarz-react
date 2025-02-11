import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import usePutUserInfo from "../../../api/hooks/UserHooks/usePutUserInfo";

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
    <form
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <textarea
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
    </form>
  );
}

export default AdditionalData;
