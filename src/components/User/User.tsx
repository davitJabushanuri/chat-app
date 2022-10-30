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

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={user.image || ""} alt="" />
      </div>
      <div className={styles.info}>
        <h3>{user.name}</h3>
        <p>{latestMessage ? latestMessage.text : ""}</p>
      </div>
      <div className={styles.time}>
        {latestMessage && (
          <p>
            <Moment format="HH:MM" date={latestMessage?.createdAt} />
          </p>
        )}
      </div>
    </div>
  );
};

export default User;
