import { motion } from "framer-motion";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import styles from "./SwiperSlider.module.css";

const SwiperSlider = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
      className={styles.sliderRow}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={3.5}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3200 }}
        speed={1000}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          290: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          380: {
            slidesPerView: 1.05,
            spaceBetween: 10,
          },
          420: {
            slidesPerView: 1.08,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1388: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 3.65,
            spaceBetween: 20,
          },
          1740: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>01</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>
                Gwarancja bezpieczeństwa Twoich danych
              </p>
              <p>
                Twoje dane są szyfrowane i chronione zgodnie z najwyższymi
                standardami.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>02</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>Leczenie na NFZ</p>
              <p>Korzystasz z bezpłatnych wizyt i usług medycznych.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>03</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>
                Dostęp do usługi całą dobę 7 dni w tygodniu
              </p>
              <p>
                Rezerwacja wizyt, konsultacje i dokumentacja medyczna zawsze pod
                ręką.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>04</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>
                Dostęp do usługi całą dobę 7 dni w tygodniu
              </p>
              <p>Możesz odwołać termin bez dodatkowych kosztów.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>05</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>E-recepty</p>
              <p>Wygodne i szybkie wystawianie recept.</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </motion.div>
  );
};

export default SwiperSlider;
