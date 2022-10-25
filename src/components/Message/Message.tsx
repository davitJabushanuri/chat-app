import styles from "./Message.module.scss";

interface IMessage {
  id: number;
  isSender: boolean;
  message: string;
}

const Message = ({ id, isSender, message }: IMessage) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.message} ${
          isSender ? styles.sender : styles.receiver
        }`}
      >
        <p className={styles.text}>{message}</p>
        <span className={styles.time}>09:30</span>
      </div>
    </div>
  );
};

export default Message;
