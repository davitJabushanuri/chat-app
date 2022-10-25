import { ISetLayout } from "@/types/types";
import styles from "./ChatHeader.module.scss";

import { IoChevronBackCircleSharp } from "react-icons/io5";

const ChatHeader = ({ setLayout }: ISetLayout) => {
  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <button onClick={() => setLayout(false)}>
          <IoChevronBackCircleSharp />
        </button>
      </div>
      <div className={styles.info}>
        <h2>Michael Jordan</h2>
        <p>Last seen 2 days ago</p>
      </div>
    </div>
  );
};

export default ChatHeader;
