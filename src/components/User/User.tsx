/* eslint-disable @next/next/no-img-element */
import { IUser } from "@/types/types";
import styles from "./User.module.scss";

import Moment from "react-moment";

interface IUserProps {
  user: IUser;
  sessionOwnerId: string;
}

const User = ({ user, sessionOwnerId }: IUserProps) => {
  const messagesWihSessionOwner = user.conversations
    ? user.conversations[0]?.messages.filter((message) => {
        if (
          (message.senderId === sessionOwnerId &&
            message.receiverId === user.id) ||
          (message.receiverId === sessionOwnerId &&
            message.senderId === user.id)
        ) {
          return message;
        }
      })
    : [];

  const latestMessage = messagesWihSessionOwner
    ? messagesWihSessionOwner[messagesWihSessionOwner.length - 1]
    : null;

  console.log(latestMessage);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={user.image || ""} alt="user-image" />
      </div>
      <div className={styles.info}>
        <h3>{user.name}</h3>
        <p>{latestMessage ? latestMessage.content : ""}</p>
      </div>
      <div className={styles.time}>
        <p>
          <Moment format="LT" date={latestMessage?.createdAt} />
        </p>
      </div>
    </div>
  );
};

export default User;
