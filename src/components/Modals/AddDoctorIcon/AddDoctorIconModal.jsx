import styles from "./AddDoctorIconModal.module.css";
import BlueBtn from "../../Buttons/BlueBtn/BlueBtn";
import useStore from "../../../data/store";
import img1 from "@assets/img/doctorIcons/1.webp";
import img2 from "@assets/img/doctorIcons/2.webp";
import img3 from "@assets/img/doctorIcons/3.webp";
import img4 from "@assets/img/doctorIcons/4.webp";
import img5 from "@assets/img/doctorIcons/5.webp";
import img6 from "@assets/img/doctorIcons/6.webp";
import img7 from "@assets/img/doctorIcons/7.webp";
import img8 from "@assets/img/doctorIcons/8.webp";
import img9 from "@assets/img/doctorIcons/9.webp";
import img10 from "@assets/img/doctorIcons/10.webp";
import img11 from "@assets/img/doctorIcons/11.webp";
import img12 from "@assets/img/doctorIcons/12.webp";
import img13 from "@assets/img/doctorIcons/13.webp";
import img14 from "@assets/img/doctorIcons/14.webp";
import img15 from "@assets/img/doctorIcons/15.webp";
import img16 from "@assets/img/doctorIcons/16.webp";
import img17 from "@assets/img/doctorIcons/17.webp";
import img18 from "@assets/img/doctorIcons/18.webp";
import img19 from "@assets/img/doctorIcons/19.webp";
import img20 from "@assets/img/doctorIcons/20.webp";
import img21 from "@assets/img/doctorIcons/21.webp";
import img22 from "@assets/img/doctorIcons/22.webp";
import img23 from "@assets/img/doctorIcons/23.webp";
import img24 from "@assets/img/doctorIcons/24.webp";

function AddDoctorIconModal({ onSelectIcon }) {
  const { setModalActive } = useStore();

  const icons = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,
    img24,
  ];

  const handleIconSelect = (iconPath) => {
    onSelectIcon(iconPath);
    setModalActive(false);
  };

  return (
    <div>
      <h2 className={styles.modalTitle}>Wybierz ikonę</h2>
      <div className={styles.iconsGrid}>
        {icons.map((icon, index) => (
          <div
            key={index}
            className={styles.iconItem}
            onClick={() => handleIconSelect(icon)}
          >
            <img src={icon} alt={`Icon ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className={styles.modalActions}>
        <BlueBtn cb={() => setModalActive(false)}>Anuluj</BlueBtn>
      </div>
    </div>
  );
}

export default AddDoctorIconModal;
