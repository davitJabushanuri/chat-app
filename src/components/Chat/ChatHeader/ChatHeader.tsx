import styles from "./ChatHeader.module.scss";

import { IoChevronBackCircleSharp } from "react-icons/io5";

interface IChatHeaderProps {
  setLayout: any;
  receiverName: string;
}

const ChatHeader = ({ setLayout, receiverName }: IChatHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <button onClick={() => setLayout(false)}>
          <IoChevronBackCircleSharp />
        </button>
      </div>
      <div className={styles.info}>
        <h2>{receiverName}</h2>
        <p>Last seen 2 days ago</p>
      </div>
    </div>
  );
};

export default ChatHeader;
