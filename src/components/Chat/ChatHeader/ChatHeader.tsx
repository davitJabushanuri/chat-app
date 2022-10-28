/* eslint-disable @next/next/no-img-element */
import styles from "./ChatHeader.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import Moment from "react-moment";
interface IChatHeaderProps {
  setLayout: (layout: boolean) => void;
  receiverName: string;
  receiverImage: string;
  lastMessageTime: Date;
}

const ChatHeader = ({
  setLayout,
  receiverName,
  receiverImage,
  lastMessageTime,
}: IChatHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <button onClick={() => setLayout(false)}>
          <IoChevronBackCircleSharp />
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={receiverImage || ""} alt="" />
        </div>
        <div>
          <h2>{receiverName}</h2>
          <p>
            <span>Last seen</span> <Moment calendar>{lastMessageTime}</Moment>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
