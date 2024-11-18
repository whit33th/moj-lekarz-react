import styles from "./InputError.module.css";
function InputError({ errorField, formState }) {
  const errorText = formState.errors[errorField]?.message;

  return <p className={styles.error}>{errorText}</p>;
}

export default InputError;
