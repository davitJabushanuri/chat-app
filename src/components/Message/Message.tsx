/* eslint-disable @next/next/no-img-element */
import styles from "./Message.module.scss";
import Moment from "react-moment";

interface IMessage {
  isSender: boolean;
  message: string;
  receiverName: string;
  receiverImage: string;
  senderImage: string | null;
  time: Date;
}

const Message = ({
  isSender,
  message,
  receiverName,
  receiverImage,
  senderImage,
  time,
}: IMessage) => {
  return (
    <div
      className={`${styles.container} ${
        isSender ? styles.sender : styles.receiver
      }`}
    >
      <div className={styles.image}>
        <img
          src={senderImage && isSender ? senderImage : receiverImage}
          alt=""
        />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.name}>{isSender ? "You" : receiverName}</span>

          <span className={styles.time}>
            {<Moment calendar>{time}</Moment>}
          </span>
        </div>
        <div className={styles.message}>
          <p className={styles.text}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
