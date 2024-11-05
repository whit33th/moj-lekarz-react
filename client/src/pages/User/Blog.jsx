import React, { useState, useMemo, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import { useSelector } from 'react-redux';
import styles from './style/Blog.module.css';

const BlogButton = React.memo(({ onClick, active, children }) => (
    <button onClick={onClick} className={active ? styles.activeButton : ''}>
        {children}
    </button>
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
    const [activeFilterId, setActiveFilterId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const blogs = useSelector((state) => state.some.blogs); 

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const clickFilterBtn = (id) => {
        setActiveFilterId(id === activeFilterId ? null : id);
    };

    const filteredBlogs = useMemo(() => {
        return blogs.map(category => ({
            ...category,
            data: category.data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }));
    }, [blogs, searchTerm]);

    const hasSearchResults = useMemo(() => {
        return filteredBlogs.some(category => category.data.length > 0);
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
        <div className={styles.blogContainer}>
            <div className={styles.searchBar}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Szukaj..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                </div>
            </div>
            {!isSearching && (
                <div className={styles.buttonContainer}>
                    {blogs.map(el => (
                        <BlogButton
                            key={el.id}
                            onClick={() => clickFilterBtn(el.id)}
                            active={activeFilterId === el.id}
                        >
                            {el.categoryName}
                        </BlogButton>
                    ))}
                </div>
            )}
            {
                isSearching && hasSearchResults
                ? <div className={styles.blogsFilterActiveContainer}>
                    {filteredBlogs.flatMap(category => category.data).map(item => (
                        <BlogItem key={item.id} item={item} onClick={handleBlogClick} />
                    ))}
                </div>
                : !isSearching && activeFilterId == null
                ? blogs.map(item => (
                    <div className={styles.blogSlide} key={item.id}>
                        <h1 className={styles.title}>{item.categoryName}</h1>
                        <div className={styles.blogSlideContainer}>
                            <Swiper
                                navigation={{
                                    nextEl: `.swiper-button-next-${item.id}`,
                                    prevEl: `.swiper-button-prev-${item.id}`,
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
                                {item.data.map(el => (
                                    <SwiperSlide className={styles.slideItem} key={el.id}>
                                        <div 
                                            className={styles.slideItemContainer} 
                                            onClick={() => handleBlogClick(el)}
                                        >
                                            <img src={el.img} className={styles.slideItemImg} alt={`Slide ${el.id}`} />
                                            <div className={styles.slideItemText}>
                                                <p>{el.name}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className={`${styles.swiperButtonPrev} swiper-button-prev-${item.id}`} />
                            <div className={`${styles.swiperButtonNext} swiper-button-next-${item.id}`} />
                        </div>
                    </div>
                ))
                : activeFilterId != null && (
                    <div className={styles.blogsFilterActiveContainer}>
                        {filteredBlogs.filter(el => el.id === activeFilterId).length > 0
                            ? filteredBlogs.filter(el => el.id === activeFilterId)[0].data.map(item => (
                                <BlogItem key={item.id} item={item} onClick={handleBlogClick} />
                            ))
                            : <div>No items found</div>
                        }
                    </div>
                )
            }

            {isPopupVisible && selectedBlog && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <span className={styles.closeButton} onClick={handleClosePopup}>&times;</span>
                        <div className={styles.popupImageConteiner}>
                            <img src={selectedBlog.img} alt="Blog Image" className={styles.popupImage} />
                        </div>
                        <h2>{selectedBlog.name}</h2>
                        <p>{selectedBlog.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Blog;