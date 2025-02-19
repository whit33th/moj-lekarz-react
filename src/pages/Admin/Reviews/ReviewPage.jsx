import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useGetAdminModerateReviews from "../../../api/hooks/GeneralHooks/ReviewsHooks/useGetAdminModerateReviews";
import useGetAdminReviews from "../../../api/hooks/GeneralHooks/ReviewsHooks/useGetAdminReviews";
import Tabs from "../../../components/Buttons/Tabs/Tabs";
import ModerationCard from "./ModerationCard";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewPage.module.css";

function ReviewPage() {
  const [activeTab, setActiveTab] = useState("Moderacja");

  const { data: uncompletedReviews, isLoading: loadingUncompleted } =
    useGetAdminModerateReviews();

  const { data: completedReviews, isLoading: loadingCompleted } =
    useGetAdminReviews();

  function handleTabClick(name) {
    setActiveTab(name);
  }

  const SkeletonCard = () => (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonHeader}>
        <Skeleton circle width={90} height={90} />
        <div className={styles.skeletonInfo}>
          <Skeleton width={150} />
          <Skeleton width={100} />
          <Skeleton width={130} height={30} />
        </div>
      </div>
      <Skeleton count={3} />
    </div>
  );

  const renderSkeletonColumn = () =>
    Array(3)
      .fill()
      .map((_, index) => <SkeletonCard key={index} />);

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
        tags: review.tags.map((tag) => tag.name),
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
          {activeTab === "Moderacja" &&
            loadingUncompleted &&
            renderSkeletonColumn()}
          {activeTab === "Moderacja" &&
            !loadingUncompleted &&
            evenUncompleted?.map((review) => (
              <ModerationCard key={review.id} {...review} />
            ))}
          {activeTab === "Opinia" && loadingCompleted && renderSkeletonColumn()}
          {activeTab === "Opinia" &&
            !loadingCompleted &&
            evenCompleted?.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
        </div>
        <div className={styles.column}>
          {activeTab === "Moderacja" &&
            loadingUncompleted &&
            renderSkeletonColumn()}
          {activeTab === "Moderacja" &&
            !loadingUncompleted &&
            oddUncompleted?.map((review) => (
              <ModerationCard key={review.id} {...review} />
            ))}
          {activeTab === "Opinia" && loadingCompleted && renderSkeletonColumn()}
          {activeTab === "Opinia" &&
            !loadingCompleted &&
            oddCompleted?.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
