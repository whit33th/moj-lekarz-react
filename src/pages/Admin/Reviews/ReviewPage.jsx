import React, { useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ModerationCard from "./ModerationCard";
import styles from "./ReviewPage.module.css";
import Tabs from "../../../components/Buttons/Tabs/Tabs";
import ReviewCard from "./ReviewCard";
import useGetAdminReviews from "../../../api/hooks/GeneralHooks/ReviewsHooks/useGetAdminReviews";

function ReviewPage() {
  const [activeTab, setActiveTab] = useState("Moderacja");
  
  const { data: uncompletedReviews, isLoading: loadingUncompleted } = useGetAdminReviews({
    status: "uncompleted",  // Make sure this matches your API's expected value
    limit: 10,
    page: 1
  });

  const { data: completedReviews, isLoading: loadingCompleted } = useGetAdminReviews({
    status: "completed",  // Make sure this matches your API's expected value
    limit: 10,
    page: 1
  });

  function handleTabClick(name) {
    setActiveTab(name);
  }

  const SkeletonCard = () => (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonHeader}>
        <Skeleton circle width={40} height={40} />
        <div className={styles.skeletonInfo}>
          <Skeleton width={150} />
          <Skeleton width={100} />
        </div>
      </div>
      <Skeleton count={3} />
      <div className={styles.skeletonTags}>
        <Skeleton width={60} />
        <Skeleton width={80} />
      </div>
    </div>
  );

  const renderSkeletonColumn = () => (
    Array(3).fill().map((_, index) => (
      <SkeletonCard key={index} />
    ))
  );

  const formatReviews = (reviews) => {
    if (!reviews?.reviews) return [[], []];
    const evenColumn = [];
    const oddColumn = [];
    
    reviews.reviews.forEach((review, index) => {
      const formattedReview = {
        id: review.id,
        name: `${review.patient.user.first_name} ${review.patient.user.last_name}`,
        date: new Date(review.createdAt).toLocaleDateString(),
        text: review.comment,
        rating: review.rating,
        avatar: review.patient.user.photo,
        tags: review.tags.map(tag => tag.name)
      };
      
      if (index % 2 === 0) {
        evenColumn.push(formattedReview);
      } else {
        oddColumn.push(formattedReview);
      }
    });
    
    return [evenColumn, oddColumn];
  };

  const [evenUncompleted, oddUncompleted] = formatReviews(uncompletedReviews);
  const [evenCompleted, oddCompleted] = formatReviews(completedReviews);

  return (
    <>
      <Tabs
        buttons="Moderacja,Opinia"
        activeTab={activeTab}
        onTabClick={handleTabClick}
        storageKey="ReviewPageNavbar"
      />
      <div className={styles.cardsContainer}>
        <div className={styles.column}>
          {activeTab === "Moderacja" && loadingUncompleted && renderSkeletonColumn()}
          {activeTab === "Moderacja" && !loadingUncompleted &&
            evenUncompleted?.map((review) => (
              <ModerationCard
                key={review.id}
                {...review}
              />
            ))}
          {activeTab === "Opinia" && loadingCompleted && renderSkeletonColumn()}
          {activeTab === "Opinia" && !loadingCompleted &&
            evenCompleted?.map((review) => (
              <ReviewCard
                key={review.id}
                {...review}
              />
            ))}
        </div>
        <div className={styles.column}>
          {activeTab === "Moderacja" && loadingUncompleted && renderSkeletonColumn()}
          {activeTab === "Moderacja" && !loadingUncompleted &&
            oddUncompleted?.map((review) => (
              <ModerationCard
                key={review.id}
                {...review}
              />
            ))}
          {activeTab === "Opinia" && loadingCompleted && renderSkeletonColumn()}
          {activeTab === "Opinia" && !loadingCompleted &&
            oddCompleted?.map((review) => (
              <ReviewCard
                key={review.id}
                {...review}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
