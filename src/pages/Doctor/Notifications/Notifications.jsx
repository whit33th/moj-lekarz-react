import clip from "@assets/img/clip.png";
import moreInfoPurple from "@assets/img/more-info-purple.png";
import plus from "@assets/img/plus.png";
import profil from "@assets/img/profil.webp";
import robot from "@assets/img/robot_svg/4.png";
import searchIco from "@assets/img/search.png";
import send from "@assets/img/send.png";
import styles from "./Notifications.module.css";

import Member from "../../../components/Notifications/Member";

import { userItems } from "../../../helpers/userItemList";

function Notifications() {
  return (
    <div className={styles.content}>
      <div className={styles.chatDiv}>
        <div className={styles.chatList}>
          <div className={styles.chatListNavbar}>
            <form className={styles.chatSearch} action="" method="post">
              <img src={searchIco} alt="search" />
              <input
                className={styles.searchInput}
                placeholder="Szukaj..."
                type="text"
                name="chat-search"
                id="chat-search"
              />
            </form>
            <div className={styles.addChat}>
              <span className={styles.bold} style={{ color: "#3E36B0" }}>
                CHAT
              </span>
              <img src={plus} alt="add chat" />
            </div>
          </div>
          <div className={styles.chatMembers}>
            {userItems.map((u, index) => (
              <Member
                key={index}
                name={u.name}
                img={u.img}
                lastMessage={u.lastMessage}
                newMessageCount={u.newMessageCount}
              />
            ))}
          </div>
        </div>
        <div className={styles.chat}>
          <div className={styles.chatNavbar}>
            <div className={styles.memberLeft}>
              <img
                className={styles.currentMemberImg}
                src={profil}
                alt="current member"
              />
              <div className={styles.memberInfo}>
                <p className={styles.bold}>Name</p>
                <p className={`${styles.grey} ${styles.lastMessage}`}>
                  aka Sigma (bo$$)
                </p>
              </div>
            </div>
            <img
              className={`${styles.chatMoreInfo} ${styles.hoverOpacity} ${styles.activeScale}`}
              src={moreInfoPurple}
              alt="More info"
            />
          </div>
          <div className={styles.dialog}>
            <div className={styles.hiChat}>
              <img src={robot} alt="robot" />
            </div>
          </div>
          <div className={styles.messageBar}>
            <form className={styles.chatSearch} action="" method="post">
              <input
                className={styles.searchInput}
                placeholder="Szukaj..."
                type="text"
                name="message"
                id="message"
              />
            </form>
            <div
              style={{ width: "42px", height: "42px" }}
              className={`${styles.hoverOpacity} ${styles.activeScale}`}
            >
              <img
                style={{ width: "10px", height: "auto" }}
                src={clip}
                alt="clip"
              />
            </div>
            <div
              className={`${styles.sendDiv} ${styles.hoverOpacity} ${styles.activeScale}`}
            >
              <img src={send} alt="send" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
