import { useState, useEffect } from "react";
import styles from "./PartnersSlider.module.css";
import imgArrow from "../assets/img/Vector (32).svg";
import facebookLogo from "../assets/img/Frame529.png";

const partnersState = [
  { name: "Facebook", img: facebookLogo },
  { name: "Instagram", img: facebookLogo },
  { name: "Twitter", img: facebookLogo },
  { name: "LinkedIn", img: facebookLogo },
  { name: "Pinterest", img: facebookLogo },
  { name: "Pinterest", img: facebookLogo },
  { name: "Pinterest", img: facebookLogo },
  { name: "Pinterest", img: facebookLogo },
  { name: "Pinterest", img: facebookLogo },
];
function PartnersSlider(props) {
  const [sliderStatePage, setSliderStatePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 624) {
        setItemsPerPage(2);
      } else if (window.innerWidth <= 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(5);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const sliderFunctionLeft = () => {
    if (sliderStatePage > 0) {
      setSliderStatePage(sliderStatePage - 1);
    }
  };

  const sliderFunctionRight = () => {
    if (sliderStatePage < partnersState.length - itemsPerPage) {
      setSliderStatePage(sliderStatePage + 1);
    }
  };

  return (
    <div className={styles.partnersSlider}>
      <div className={styles.partnersBtnArrowLeft}>
        <div
          className={styles.partnersSliderBtn}
          onClick={sliderFunctionLeft}
          style={{ background: sliderStatePage === 0 && "#f1f1f1" }}
        >
          <img src={imgArrow} style={{ transform: "rotate(180deg)" }} />
        </div>
      </div>
      <div className={styles.sliderContent}>
        <div
          className={styles.sliderContentRow}
          style={{
            transform: `translateX(-${
              sliderStatePage * (100 / itemsPerPage)
            }%)`,
          }}
        >
          {partnersState.map((item, index) => (
            <div className={styles.partnersIconsItem} key={index}>
              <img src={item.img} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.partnersBtnArrowRight}>
        <div
          className={styles.partnersSliderBtn}
          onClick={sliderFunctionRight}
          style={{
            background:
              sliderStatePage * itemsPerPage >= partnersState.length &&
              "#f1f1f1",
          }}
        >
          <img src={imgArrow} />
        </div>
      </div>
    </div>
  );
}

export default PartnersSlider;
