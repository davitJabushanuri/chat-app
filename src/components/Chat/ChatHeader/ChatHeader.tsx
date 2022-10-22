import { ISetLayout } from "@/types/types";
import styles from "./ChatHeader.module.scss";

const ChatHeader = ({ setLayout }: ISetLayout) => {
  return (
    <div className={styles.container}>
      <button onClick={() => setLayout(false)}>back</button>
    </div>
  );
};

export default ChatHeader;
