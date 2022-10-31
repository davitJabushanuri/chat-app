/* eslint-disable @next/next/no-img-element */
import styles from "./Message.module.scss";
import Moment from "react-moment";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

interface IMessage {
  isSender: boolean;
  messageText: string | undefined;
  messageImage: string | undefined;
  receiverName: string;
  receiverImage: string;
  senderImage: string | null;
  time: Date;
}

const Message = ({
  isSender,
  messageText,
  messageImage,
  receiverName,
  receiverImage,
  senderImage,
  time,
}: IMessage) => {
  const myCld = new Cloudinary({
    cloud: {
      cloudName: "djywo6ccm",
    },
  });

  const img = myCld.image(messageImage as string);

  console.log(messageImage);

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
        {messageText && (
          <div className={styles.message}>
            <p className={styles.text}>{messageText}</p>
          </div>
        )}

        {messageImage && (
          <div>
            <AdvancedImage cldImg={img} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
