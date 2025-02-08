import { forwardRef } from "react";
import styles from "./Textarea.module.css";

const Textarea = forwardRef(({ resize = true, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`${styles.textarea} ${!resize ? styles.noresize : ""}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
