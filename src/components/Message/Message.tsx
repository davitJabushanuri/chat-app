import styles from "./Message.module.scss";
import Moment from "react-moment";

interface IMessage {
  isSender: boolean;
  message: string;
  time: Date;
}

const Message = ({ isSender, message, time }: IMessage) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.message} ${
          isSender ? styles.sender : styles.receiver
        }`}
      >
        <p className={styles.text}>{message}</p>
        <span className={styles.time}>
          {<Moment format="HH:mm">{time}</Moment>}
        </span>
      </div>
    </div>
  );
};

export default Message;
