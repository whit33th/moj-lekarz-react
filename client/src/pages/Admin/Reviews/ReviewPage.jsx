import React, { useState } from "react";
import ModerationCard from "./ModerationCard";
import styles from "./ReviewPage.module.css";
import Tabs from "../../../components/Buttons/Tabs/Tabs";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    name: "La Fontaine",
    date: "06.02.2024",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat eros ligula.  Vivamus posuere, lacus non dapibus laoreet, elit ligula laoreet metus, eu ultricies sem purus eget magna. Donec consectetur mi nec pharetra pharetra Suspendisse sit amet arcu ac elit lacinia cursus. Aliquam erat volutpat. Maecenas ut leo elit. Sed cursus nisi sed massa aliquam, eget tincidunt dolor posuer",
    rating: 5,
  },
  {
    name: "Jan Reno",
    date: "06.02.2024",
    rating: 4,
  },
  {
    name: "Honoré de Balzac",
    date: "06.02.2024",
    text: "SCAM ♥",
  },
  {
    name: "Charles de Gaulle",
    date: "06.02.2024",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate dolor sit amet, ultrices nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate dolor sit amet, ultrices nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate dolor sit amet, ultrices nunc.",
    rating: 5,
  },
  {
    name: "Gérard de Sole",
    date: "06.02.2024",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate dolor sit amet, ultrices nunc.",
    rating: 4,
  },
];

function ReviewPage() {
  const [activeTab, setActiveTab] = useState("Moderacja");

  const evenReviews = reviews.filter((_, index) => index % 2 === 0);
  const oddReviews = reviews.filter((_, index) => index % 2 !== 0);

  function handleTabClick(name) {
    setActiveTab(name);
  }
  return (
    <>
      <Tabs
        buttons="Moderacja,Opinia"
        activeTab={activeTab}
        onTabClick={handleTabClick}
        storageKey="page1-tabs"
      />
      <div className={styles.cardsContainer}>
        <div className={styles.column}>
          {activeTab === "Moderacja" &&
            evenReviews.map((review, index) => (
              <ModerationCard
                key={`even-${index}`}
                name={review.name}
                date={review.date}
                text={review.text}
                rating={review.rating}
              />
            ))}
          {activeTab === "Opinia" &&
            evenReviews.map((review, index) => (
              <ReviewCard
                key={`even-${index}`}
                name={review.name}
                date={review.date}
                text={review.text}
                rating={review.rating}
              />
            ))}
        </div>
        <div className={styles.column}>
          {activeTab === "Moderacja" &&
            oddReviews.map((review, index) => (
              <ModerationCard
                key={`even-${index}`}
                name={review.name}
                date={review.date}
                text={review.text}
                rating={review.rating}
              />
            ))}
          {activeTab === "Opinia" &&
            oddReviews.map((review, index) => (
              <ReviewCard
                key={`even-${index}`}
                name={review.name}
                date={review.date}
                text={review.text}
                rating={review.rating}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
