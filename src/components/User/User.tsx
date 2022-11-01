/* eslint-disable @next/next/no-img-element */
import { IConversation, IUser } from "@/types/types";
import styles from "./User.module.scss";

import Moment from "react-moment";

interface IUserProps {
  user: IUser;
  sessionOwnerId: string;
}

const User = ({ user, sessionOwnerId }: IUserProps) => {
  const messagesWihSessionOwner = user.conversations.find(
    (conversation: IConversation) =>
      conversation.users.find((user) => user.id === sessionOwnerId)
  );

  const latestMessage = messagesWihSessionOwner?.messages.slice(-1)[0];

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={user.image || ""} alt="" />
      </div>
      <div className={styles.info}>
        <h3>{user.name}</h3>
        {latestMessage && <p>{latestMessage.text}</p>}
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
