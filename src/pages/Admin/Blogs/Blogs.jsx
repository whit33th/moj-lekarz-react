"use client";

import { useState, useMemo } from "react";
import { useGetPosts } from "../../../api/hooks/GeneralHooks/Posts/useGetPosts";
import useDeletePosts from "../../../api/hooks/GeneralHooks/Posts/useDeletePosts";
import BlueBorderBtn from "../../../components/Buttons/BlueBorderBtn/BlueBorderBtn";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import styles from "./Blogs.module.css";
import grey from "@assets/img/grey.png";
import Search from "../../../components/UI/Search/Search";
import AddBlogModal from "../../../components/Modals/AddBlogModal/AddBlogModal";
import EditBlogModal from "../../../components/Modals/EditBlogModal/EditBlogModal";
import DeleteBlogModal from "../../../components/Modals/DeleteBlogModal/DeleteBlogModal";
import useStore from "../../../data/store";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BlogSkeleton = () => (
  <div className={styles.tableRow}>
    <div className={styles.mainContent}>
      <Skeleton height={150} width={200} />
      <div className={styles.articleContent}>
        <div className={styles.articleHeader}>
          <Skeleton height={24} width={200} />
          <div className={styles.articleMeta}>
            <Skeleton height={16} width={80} />
            <Skeleton height={16} width={100} style={{ marginLeft: '8px' }} />
          </div>
        </div>
        <Skeleton count={3} height={16} style={{ marginTop: '8px' }} />
      </div>
    </div>
    <div className={styles.actionButtons}>
      <Skeleton height={35} width={80} style={{ marginRight: '8px' }} />
      <Skeleton height={35} width={80} />
    </div>
  </div>
);

function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setModalContent, setModalActive } = useStore();
  const { data, isLoading } = useGetPosts(1, 10); // Add appropriate pagination parameters
  const { mutate: deleteBlog } = useDeletePosts();

  function handleAddModal() {
    setModalActive(true);
    setModalContent(<AddBlogModal />);
  }

  function handleEditModal(post) {
    setModalActive(true);
    setModalContent(<EditBlogModal post={post} />);
  }

  const handleDelete = (id) => {
    setModalActive(true);
    setModalContent(
      <DeleteBlogModal
        modalWindowStatus={true}
        setModalWindowStatus={() => setModalActive(false)}
        deleteFc={() => {
          deleteBlog(id);
          setModalActive(false);
        }}
      />
    );
  };

  const articles = useMemo(() => {
    if (!data?.posts) return [];
    return Object.entries(data.posts).flatMap(([category, posts]) =>
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        date: "01.06.2024", // You might want to add actual date to your API response
        shortDescription: post.content,
        image: post.photo,
        category: post.category.name,
      }))
    );
  }, [data]);

  const sliceText = (text, maxLength = 300) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const searchLower = searchQuery.toLowerCase().trim();
      return (
        article.title.toLowerCase().includes(searchLower) ||
        article.shortDescription.toLowerCase().includes(searchLower) ||
        article.date.toLowerCase().includes(searchLower) ||
        article.category.toLowerCase().includes(searchLower)
      );
    });
  }, [articles, searchQuery]);

  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.header}>
          <div className={styles.searchContainer}>
            <Search
              placeholder={"Szukaj blog..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.addButtonWrapper}>
            <BlueBtn cb={handleAddModal}>Dodaj</BlueBtn>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          {isLoading ? (
            <>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </>
          ) : (
            filteredArticles.map((article) => (
              <div key={article.id} className={styles.tableRow}>
                <div className={styles.mainContent}>
                  <img
                    src={article.image || grey}
                    alt={article.title}
                    className={styles.articleImage}
                  />
                  <div className={styles.articleContent}>
                    <div className={styles.articleHeader}>
                      <h2>{article.title}</h2>
                      <div className={styles.articleMeta}>
                        <span className={styles.articleDate}>{article.date}</span>
                        <span className={styles.articleCategory}>
                          • {article.category}
                        </span>
                      </div>
                    </div>
                    <p className={styles.articleDescription}>
                      {sliceText(article.shortDescription)}
                    </p>
                  </div>
                </div>
                <div className={styles.actionButtons}>
                  <BlueBtn cb={() => handleEditModal(article)}>Edytuj</BlueBtn>
                  <BlueBorderBtn cb={() => handleDelete(article.id)}>
                    Usuń
                  </BlueBorderBtn>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Blogs;
