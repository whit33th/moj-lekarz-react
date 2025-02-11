import { useState, useEffect } from "react";
import styles from "./PartnersSlider.module.css";
import imgArrow from "@assets/img/Vector (32).svg";
import facebookLogo from "@assets/img/Frame529.png";

import img1 from "@assets/img/partners/1.png";
import img2 from "@assets/img/partners/2.png";
import img3 from "@assets/img/partners/3.png";
import img4 from "@assets/img/partners/4.png";
import img5 from "@assets/img/partners/5.png";
import img6 from "@assets/img/partners/6.png";

const partnersState = [
  { name: "Facebook", img: img1 },
  { name: "Instagram", img: img2 },
  { name: "Twitter", img: img3 },
  { name: "LinkedIn", img: img4 },
  { name: "Pinterest", img: img5 },
  { name: "Pinterest", img: img6 },
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
          <img
            src={imgArrow}
            alt="Przycisk przewijania w lewo"
            style={{ transform: "rotate(180deg)" }}
          />
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
              <img src={item.img} alt={`Logo partnera ${item.name}`} />
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
          <img src={imgArrow} alt="Przycisk przewijania w prawo" />
        </div>
      </div>
    </div>
  );
}

export default PartnersSlider;
