import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import styles from './SwiperSlider.module.css';


import { Pagination , Autoplay  } from 'swiper/modules';

const SwiperSlider = () => {
  return (
    <div className={styles.sliderRow}>
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
              <p className={styles.sliderItemTextTitle}>Gwarancja bezpieczeństwa Twoich danych</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>02</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>Leczenie na NFZ</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>03</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>Dostęp do usługi całą dobę 7 dni w tygodniu</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>04</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>Dostęp do usługi całą dobę 7 dni w tygodniu</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>05</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>Gwarancja bezpieczeństwa Twoich danych</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.sliderItem}>
            <h3>06</h3>
            <div className={styles.sliderItemText}>
              <p className={styles.sliderItemTextTitle}>Gwarancja bezpieczeństwa Twoich danych</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis.</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
