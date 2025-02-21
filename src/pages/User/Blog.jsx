import { motion } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useGetPosts } from "../../api/hooks/GeneralHooks/Posts/useGetPosts";
import styles from "./style/Blog.module.css";

const BlogButton = React.memo(({ onClick, active, children, delay }) => (
  <motion.button
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    onClick={onClick}
    className={active ? styles.activeButton : ""}
  >
    {children}
  </motion.button>
));

const BlogItem = React.memo(({ item, onClick }) => (
  <div className={styles.blogsFilterActiveItem} onClick={() => onClick(item)}>
    <div className={styles.blogItem}>
      <img src={item.img} alt={item.name} />
      <p className={styles.blogItemText}>{item.name}</p>
    </div>
  </div>
));

function Blog() {
  const { data } = useGetPosts({});
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const categories = useMemo(() => {
    if (!data?.posts) return [];
    return Object.keys(data?.posts).map((name) => ({
      id: name,
      categoryName: name,
      data: data.posts[name].map((post) => ({
        id: post.id,
        img: post.photo,
        name: post.title,
        text: post.content,
      })),
    }));
  }, [data]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clickFilterBtn = (id) => {
    setActiveFilterId(id === activeFilterId ? null : id);
  };

  const filteredBlogs = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      data: category.data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }));
  }, [categories, searchTerm]);

  const hasSearchResults = useMemo(() => {
    return filteredBlogs.some((category) => category.data.length > 0);
  }, [filteredBlogs]);

  const handleBlogClick = useCallback((blog) => {
    setSelectedBlog(blog);
    setIsPopupVisible(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setIsPopupVisible(false);
    setSelectedBlog(null);
  }, []);

  const isSearching = searchTerm.trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.blogContainer}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.searchBar}
      >
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Szukaj..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
      </motion.div>

      {!isSearching && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.buttonContainer}
        >
          {categories.map((category, index) => (
            <BlogButton
              key={category.id}
              onClick={() => clickFilterBtn(category.id)}
              active={activeFilterId === category.id}
              delay={0.1 * (index + 1)}
            >
              {category.categoryName}
            </BlogButton>
          ))}
        </motion.div>
      )}

      {isSearching && hasSearchResults ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.blogsFilterActiveContainer}
        >
          {filteredBlogs
            .flatMap((category) => category.data)
            .map((item) => (
              <BlogItem key={item.id} item={item} onClick={handleBlogClick} />
            ))}
        </motion.div>
      ) : !isSearching && activeFilterId == null ? (
        categories.map((category) => (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.blogSlide}
            key={category.id}
          >
            <h1 className={styles.title}>{category.categoryName}</h1>
            <div className={styles.blogSlideContainer}>
              <Swiper
                navigation={{
                  nextEl: `.swiper-button-next-${category.id}`,
                  prevEl: `.swiper-button-prev-${category.id}`,
                }}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                className={styles.mySwiper}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {category.data.map((post) => (
                  <SwiperSlide className={styles.slideItem} key={post.id}>
                    <div
                      className={styles.slideItemContainer}
                      onClick={() => handleBlogClick(post)}
                    >
                      <img
                        src={post.img}
                        className={styles.slideItemImg}
                        alt={post.name}
                      />
                      <div className={styles.slideItemText}>
                        <p>{post.name}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                className={`${styles.swiperButtonPrev} swiper-button-prev-${category.id}`}
              />
              <div
                className={`${styles.swiperButtonNext} swiper-button-next-${category.id}`}
              />
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.blogsFilterActiveContainer}
        >
          {filteredBlogs
            .find((cat) => cat.id === activeFilterId)
            ?.data.map((item) => (
              <BlogItem key={item.id} item={item} onClick={handleBlogClick} />
            )) || <div>Nie znaleziono blogów</div>}
        </motion.div>
      )}

      {isPopupVisible && selectedBlog && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={styles.popup}
        >
          <div className={styles.popupContent}>
            <span className={styles.closeButton} onClick={handleClosePopup}>
              &times;
            </span>
            <div className={styles.popupImageConteiner}>
              <img
                src={selectedBlog.img}
                alt={selectedBlog.name}
                className={styles.popupImage}
              />
            </div>
            <h2>{selectedBlog.name}</h2>
            <p>{selectedBlog.text}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Blog;
