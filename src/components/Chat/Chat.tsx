import { ISetLayout } from "@/types/types";
import styles from "./Chat.module.scss";
import ChatHeader from "./ChatHeader/ChatHeader";

const Chat = ({ setLayout }: ISetLayout) => {
  return (
    <div className={styles.container}>
      <ChatHeader setLayout={setLayout} />
    </div>
  );
};

export default Chat;
